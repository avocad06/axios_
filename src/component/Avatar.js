import { useState } from "react"
import none from '../none_avatar.jpg'

const Avatar = () => {
    const [profile, setProfile] = useState(none);
    return (
        <div className="Avatar">
            <img src={profile} className="profile-img" />

        </div>
    )
}

export default Avatar