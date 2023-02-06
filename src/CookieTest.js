import { useCookies, Cookies } from 'react-cookie'


const CookieTest = () => {
    const [cookies, setCookie] = useCookies('access')
    setCookie('access', 'asdfaeasfsdfsdfaeasdfasefa')
    console.log(cookies)
    let cookieValue = document.cookie;
    let testValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('access'))?.split('=')[1];
    console.log(testValue)
    return (
        <div>
            쿠키
        </div>
    )

}

export default CookieTest