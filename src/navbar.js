import logo from './logo2.png'
import { FaBars, FaTwitter } from 'react-icons/fa';
import { links } from './data';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const user = useSelector(state => {
        return state.user.email
    })
    
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
                <ul className="social-icons">
                    <li>
                        <a href="https://wlgustlra.tistory.com/">
                            <FaTwitter />
                        </a>
                    </li>
                    {user}
                </ul>
            </div>
        </nav >
    )
}