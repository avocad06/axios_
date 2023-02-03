import axios from "axios";

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

export const onLogin = (data) => {

    axios.get('hithere/list', data)
        .then(onLoginSuccess)
        .catch(error => { });
}

export const onSilentRefresh = () => {
    axios.get('/silent-refresh')
        .then(onLoginSuccess)
        .catch(error => {

        })
}

export const onLoginSuccess = response => {
    const { accessToken } = response.data.access;

    // accessToken 헤더에 넣기(응답받아와서 변경된 토큰으로 설정)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // accessToken 만료되기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 6000);
}