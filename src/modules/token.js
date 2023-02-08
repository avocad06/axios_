import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./Cookies";
export const onLogin = (body) => {
    
    const data = {
        email: body.email,
        password: body.password,
    };
    
    axios.post('http://127.0.0.1:8000/users/auth/', data, { withCredentials: true })
        .then((res) => {
            
            console.log(res)
            setCookie('refresh', res.data.token.refresh)
            return res.data.token.refresh
        }).catch(error => { });
}

export const onSilentRefresh = (refresh) => {
    // axios.interceptors.response.use(res => {
    //     console.log(res,15)
    //     return res.data
    //   },
    //   res => {
    //
    //   });
    if (refresh){
        console.log(refresh, 1)
        axios.post('http://127.0.0.1:8000/users/auth/refresh/', {"refresh":String(refresh)})
        .then((response) => {
            onAuthorize(response);
            return response.data})
            .catch(error => { });
    }
    
}

// 인가함수
export const onAuthorize = response => {
    
    let testValue = document.cookie.split('; ').find((row) => row.startsWith('refresh'))?.split('=')[1];
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    setTimeout(() => {onSilentRefresh(testValue)}, 1000 * 10);
    
}

export const onLogout = () => {
    axios.delete("http://127.0.0.1:8000/users/auth/")
        .then((res) => {
            console.log(res)
            removeCookie('refresh');
            
            axios.defaults.headers.common['Authorization'] = null;
        })
}