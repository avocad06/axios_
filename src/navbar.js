import logo from './logo2.png'
import { FaBars, FaSistrix } from 'react-icons/fa';
import { links } from './data';
import { useEffect, useRef, useState } from 'react';
import Avatar from './component/Avatar';
import Search from './component/Search';

export const Navbar = () => {

    const [showLinks, setShowLinks] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        // const linksHeight = linksRef.current.offsetHeight; 
        // 거의 비슷하다. 데스크탑일 때: 24; 모바일일 때: 120;
        console.log(linksHeight)
        if (showLinks) {
            // 스타일 요소에 접근
            linksContainerRef.current.style.height = `${linksHeight}px`
        } else {
            linksContainerRef.current.style.height = '0px'
        }
    }, [showLinks])
    return (
        <nav>
            <div className="nav-center">
                <div className="nav-header">
                    <img src={logo} className='logo' alt="logo" />
                    <div className='btn-container'>
                        <button className={showLinks ? 'search-btn-open' : 'search-btn'} onClick={() => {
                            setSearchOpen(!searchOpen)
                        }}>
                            <FaSistrix />
                        </button>
                        <button className='nav-toggle' onClick={() => {
                            setShowLinks(!showLinks)
                            setSearchOpen(!searchOpen)
                        }}>
                            <FaBars />
                        </button>
                    </div>
                </div>
                <div className='links-container' ref={linksContainerRef}>
                    <ul className='links' ref={linksRef}>
                        {links.map((link) => {
                            const { id, url, text } = link;
                            return (
                                <li key={id}>
                                    <a href={url}>{text}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <Avatar />
                {searchOpen && <Search onClose={() => { setSearchOpen(false) }} />}
            </div>
        </nav >
    )
}