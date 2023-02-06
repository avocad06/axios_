import './NCS.css'
import { FaBars, FaSistrix } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import logo from './logo2.png'
import { useState } from 'react'
import { Link } from "react-router-dom";

export const NavBarCss = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <nav>
            <a href='#'>
                <img src={logo} className='logo' alt='logo' />
            </a>
            <div className='group'>
                <ul className='navigation'>
                    <li>
                        <a>메인</a>
                    </li>
                    <li>
                        <a>커뮤니티</a>
                    </li>
                    <li>
                        <a>내 스케줄</a>
                    </li>
                </ul>
            </div>
            <div className='search'>
                <span className='icon' onClick={(e) => {
                    setSearchOpen(!searchOpen)
                }}>
                    {searchOpen ? <IoClose /> : <FaSistrix />}
                </span>
            </div>
            <button className='menu-toggle'>
                <FaBars />
            </button>
            <div className={`${searchOpen ? "searchBox active" : "searchBox"}`}>
                <input type='text' placeholder='검색어를 입력해주세요.' />
            </div>

        </nav>
    )

}