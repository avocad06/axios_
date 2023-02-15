import logo from './logo2.png'
import { FaBars, FaTwitter } from 'react-icons/fa';
import { links } from './data';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { asyncUpFetch, loginUser } from './reducer/useSlice';
import { useCookies } from 'react-cookie';
import { IoRefreshCircle } from 'react-icons/io5';
import Profile from './component/Profile';

export const Navbar = ({ re }) => {
    const dispatch = useDispatch();

    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const status = useSelector(state => {
        return state.user.status;
    })

    const refresh_token = document.cookie.split('; ').find((row) => row.startsWith('refresh'))?.split('=')[1]

    const userInfo = useSelector(state => {
        return state.user
    })

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        // const linksHeight = linksRef.current.offsetHeight; 
        // 거의 비슷하다. 데스크탑일 때: 24; 모바일일 때: 120;

        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`
        } else {
            linksContainerRef.current.style.height = '0px'
        }
    }, [showLinks])

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/users/auth/')
    //         .then((res) => console.log(res, "navbar에서는 잘됩니다."))
    // }, [])

    useEffect(() => {
        console.log("데이터 fetch 시작")
        dispatch(asyncUpFetch());
        console.log(status)
    }, [])

    return (
        <nav>
            <div className="nav-center">
                <div className="nav-header">
                    <Link to="/"><img src={logo} className='logo' alt="logo" /></Link>
                    <button className='nav-toggle' onClick={() => {
                        setShowLinks(!showLinks)
                    }}>
                        <FaBars />
                    </button>
                </div>
                <div className='links-container' ref={linksContainerRef}>
                    <ul className='links' ref={linksRef}>
                        {links.map((link) => {
                            const { id, url, text } = link;
                            return <li key={id}>
                                <a href={url}>{text}</a>
                            </li>
                        })}
                    </ul>
                </div>
                {/* 로딩 중 아직 이메일이 상태에 업데이트 안됐을 경우 */}
                {status === 'loading' && !userInfo.email ? <div></div> : <div>{userInfo.email && userInfo.email}</div>}
                {/* 새로고침없이 로그아웃했을 경우 */}
                {status === 'complete' && !userInfo.email && <Link to='login'>로그인</Link>}
                {/* 로그아웃한 상태에서 새로고침했을 경우(페이지 첫 진입) */}
                {status === 'rejected' && !userInfo.email && <Link to='login'>로그인</Link>}


            </div>
        </nav >
    )
}