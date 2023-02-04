import React from 'react'
import { FaBehance, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
export const links = [
    {
        id: 1,
        url: '/',
        text: '메인',
    },
    {
        id: 2,
        url: '/about',
        text: '커뮤니티',
    },
    {
        id: 3,
        url: '/projects',
        text: '내 스케줄',
    },
    // {
    //     id: 4,
    //     url: '/contact',
    //     text: 'contact',
    // },
    // {
    //     id: 5,
    //     url: '/profile',
    //     text: 'profile',
    // },
]

export const social = [
    {
        id: 1,
        url: 'https://www.twitter.com',
        icon: <FaFacebook />,
    },
    {
        id: 2,
        url: 'https://www.twitter.com',
        icon: <FaTwitter />,
    },
    {
        id: 3,
        url: 'https://www.twitter.com',
        icon: <FaLinkedin />,
    },
    {
        id: 4,
        url: 'https://www.twitter.com',
        icon: <FaBehance />,
    },
]