import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducer/useSlice";
import { FaBars, FaTwitter } from 'react-icons/fa';
import { Link } from "react-router-dom";

// 여기서는 userName을 axios에서 받아서 dispatch 해줄거다.
const UserName = ({ resource }) => {

    const userEmail = useSelector((state) => {
        return state.user
    })

    const dispatch = useDispatch();
    // user 데이터 fetch해오는 함수 호출
    // 아직 안 받아왔으면 fallback 출력
    // 받아왔으면 user출력
    // const email = resource.user.read();
    // console.log(email)
    // dispatch(loginUser({ email: email }))
    return (
        <div className="UserName">
            {userEmail.email ?
                <div>
                    <li>
                        <a href="https://wlgustlra.tistory.com/">
                            <FaTwitter />
                        </a>
                    </li>
                    <li>{userEmail.email}</li>
                </div>
                :
                <Link to='login'>로그인</Link>}

        </div>
    )
}

export default UserName;