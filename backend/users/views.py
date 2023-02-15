# views.py
import jwt
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from django.conf import settings
from drfproject.settings import SECRET_KEY, SIMPLE_JWT

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            
            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuthAPIView(APIView):
    # 유저 정보 확인
    def get(self, request):
        print(request.COOKIES, "cookies")
        try:
            
            # access token을 decode 해서 유저 id 추출 => 유저 식별
            access = request.COOKIES.get('access', None)
            
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
            
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except(jwt.exceptions.ExpiredSignatureError):
            # 토큰 만료 시 토큰 갱신
            data = {'refresh': request.COOKIES.get('refresh', None)}
            print(data, 12)
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access', None)
                refresh = serializer.data.get('refresh', None)
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(instance=user)
                res = Response(serializer.data, status=status.HTTP_200_OK)
                res.set_cookie('access', access)
                res.set_cookie('refresh', refresh)
                return res
            raise jwt.exceptions.InvalidTokenError

        except(jwt.exceptions.InvalidTokenError):
            # 사용 불가능한 토큰일 때
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그인
    def post(self, request):
        print(request.headers, 9885)
    	# 유저 인증
        user = authenticate(
            email=request.data.get("email"), password=request.data.get("password")
        )
        # 이미 회원가입 된 유저일 때
        if user is not None:
            serializer = UserSerializer(user)
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token
                    },
                },
                status=status.HTTP_200_OK,
            )
            # res.set_cookie(
            #     key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
            #     value = {'access':access_token, 'refresh':refresh_token},
            #     expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            #     secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            #     httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            #     samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            #     )
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True, samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'], secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'], path="/")
            res.set_cookie("refresh", refresh_token, httponly=True, samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'], secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'], path="/")
            
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그아웃
    def delete(self, request):
        # 쿠키에 저장된 토큰 삭제 => 로그아웃 처리
        response = Response({
            "message": "Logout success"
            }, status=status.HTTP_202_ACCEPTED)
        
        # response.set_cookie("access", "", httponly=False, samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'], secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],)
        # response.set_cookie("refresh", "", httponly=False, samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'], secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],)
        response.delete_cookie("access", path="/", samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
        response.delete_cookie("refresh", path="/", samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])

        
        print(request.COOKIES, 3)
        return response

class AuthAPIView2(APIView):
    pass