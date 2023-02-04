import axios from "axios";

export const onLogin = (body) => {
    const data = {
        email: body.email,
        password: body.pw,
    };
    axios.post('http://127.0.0.1:8000/users/auth/', data)
        .then((res) => {
            onAuthorize();
            return res.data
        }).catch(error => { });
}

export const onSilentRefresh = (refresh) => {
    onAuthorize();
    // const [cookies, setCookie] = useCookies(['id'])
    axios.post('http://127.0.0.1:8000/users/auth/refresh/', refresh)
        .then(onAuthorize)
        .catch(error => { });
}

// 인가함수
export const onAuthorize = response => {
    const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.access}`;

    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 6000);
}

export const onLogout = () => {
    axios.delete("http://127.0.0.1:8000/users/auth/")
        .then(() => {
            axios.defaults.headers.common['Authorization'] = null;
        })
}