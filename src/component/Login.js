import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import '../login.css'
import { loginUser, clearUser } from "../reducer/useSlice";

const Login = () => {

    const [cookies, setCookie] = useCookies(['id'])
    const dispatch = useDispatch();
    const user = useSelector((state) => state.info);
    

    // 사용자 이메일, 비밀번호 상태 관리
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    // const [loading, setLoading] = useState(false);
    // const [msg, setMsg] = useState("");

    // email validation
    const [emailValid, setEmailValid] = useState(false);
    // pw validation
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => { }, [])

    useEffect(() => {
        if (emailValid && pwValid) {
            setNotAllow(false);
            return;
        } setNotAllow(true);

    }, [emailValid, pwValid]);

    // 이메일과 비밀번호가 모두 유효할 때(valid state가 변화할 때)
    const handleEmail = (e) => {
        setEmail(e.target.value);
        // 정규표현식으로 검사(문자열이 아니라 그냥 하네? vanila js에서는 test()함수 호출해서 문자열로 넣어줬었는데)
        const regex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }

    const handlePw = (e) => {
        setPw(e.target.value)
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    }

    const onClickConfirmButton = (e) => {
        e.preventDefault();

        if (!email) {
            return alert('아이디를 입력하세요.');
        } else if (!pw) {
            return alert('등록되지 않은 회원입니다.');
        }

        else {
            const data = {
                email,
                password: pw,
            };

            axios.post("http://127.0.0.1:8000/users/auth/", data)
                .then((res) => {
                    
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token.access}`;
                    
                    setCookie('refresh', res.data.token.refresh);
                    dispatch(loginUser(res.data.user))
                    
                    
                }).catch(error => { });

        }
        
    }
    const onClickrefreshButton = (e) => {
        e.preventDefault();
        const refresh = {
            'refresh': cookies.refresh
        }
        axios.post("http://127.0.0.1:8000/users/auth/refresh/", refresh)
        .then((res) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
        }).catch(error => { });
    }

    const onClickLogout = (e) => {
        e.preventDefault();
        axios.delete("http://127.0.0.1:8000/users/auth/")
        .then((res) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${""}`;
            dispatch(clearUser(res.data.user))
        }).catch(error => { });
    }


    return (
        
        <div className="Login">
            
            <form>
                <div className="titleWrap">
                    이메일과 비밀번호를
                    <br />
                    입력해주세요.
                </div>

                <div className="contentWrap">
                    <div className="inputTitle">이메일 주소</div>
                    <div className="inputWrap">
                        <input
                            type={"text"}
                            className="input"
                            placeholder="test@gmail.com"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    {/* error msg */}
                    <div className="errorMessageWrap">
                        {
                            !emailValid && email.length > 0 && (
                                <div>올바른 이메일을 입력해주세요.</div>
                            )
                        }
                    </div>

                    <div className="inputTitle" style={{ marginTop: "26px" }}>비밀번호</div>
                    <div className="inputWrap">
                        <input
                            type={"password"}
                            className="input"
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            value={pw}
                            onChange={handlePw}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !pwValid && pw.length > 0 && (
                                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                            )
                        }
                    </div>

                </div>
                <div>
                    <button type="submit" onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
                        확인
                    </button>
                    <button type="submit" onClick={onClickrefreshButton} disabled={notAllow} className="bottomButton">
                        리프레쉬
                    </button>
                    <button type="submit" onClick={onClickLogout} disabled={notAllow} className="bottomButton">
                        로그아웃
                    </button>
                </div>
            </form>


        </div >
    )
    
}

export default Login