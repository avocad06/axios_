import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import fetchData from "../modules/fetchData";
import UserName from "./UserName";

// 여기가 이제부터 최상위 컴포넌트!
const Profile = () => {

    const refresh_token = document.cookie.split('; ').find((row) => row.startsWith('refresh'))?.split('=')[1]

    const userInfo = useSelector((state) => {
        return state.user
    })
    return (
        <ul className="Profile">
        </ul >
    )
}

export default Profile;