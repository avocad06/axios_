import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./Cookies";
export const onLogin = async (body) => {
    /////////// 이부분 수정했습니다~~~~~~~~~~~~~~~~
    /////////// 이부분 수정했습니다~~~~~~~~~~~~~~~~
    /////////// 이부분 수정했습니다~~~~~~~~~~~~~~~~
    const { email, password } = body;
    const data = {
        email,
        password,
    };

    /////////// 이부분 수정했습니다~~~~~~~~~~~~~~~~
    /////////// 이부분 수정했습니다~~~~~~~~~~~~~~~~
    /////////// 이부분 수정했습니다~~~~~~~~~~~~~~~~
    const result = await axios
        .post("http://127.0.0.1:8000/users/auth/", data, { withCredentials: true })
        .then((res) => {
            setCookie("refresh", res.data.token.refresh);
            return {
                email: res.data.user.email,
            };
        })
        .catch((error) => {
            console.log(error.message);
        });
    return result;
};

export const onSilentRefresh = (refresh) => {
    // axios.interceptors.response.use(res => {
    //     console.log(res,15)
    //     return res.data
    //   },
    //   res => {
    //
    //   });
    if (refresh) {
        console.log(refresh, 1);
        axios
            .post("http://127.0.0.1:8000/users/auth/refresh/", { refresh: String(refresh) })
            .then((response) => {
                onAuthorize(response);
                return response.data;
            })
            .catch((error) => {});
    }
};

// 인가함수
export const onAuthorize = (response) => {
    let testValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refresh"))
        ?.split("=")[1];

    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
    console.log(axios.defaults.headers);
    setTimeout(() => {
        onSilentRefresh(testValue);
    }, 1000 * 60 * 4);
};

export const onLogout = () => {
    axios.delete("http://127.0.0.1:8000/users/auth/").then((res) => {
        console.log(res);
        removeCookie("refresh");

        axios.defaults.headers.common["Authorization"] = null;
    });
};
