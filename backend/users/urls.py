from django.urls import path, include
from .views import RegisterAPIView, AuthAPIView, AuthAPIView2
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterAPIView.as_view()),
    path("auth/", AuthAPIView.as_view()),
    path("auth2/", AuthAPIView2.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()), # jwt 토큰 재발급
]