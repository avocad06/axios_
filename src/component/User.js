import { Suspense } from "react";
import Posts from "./Posts";

function User({ resource }) {
    const user = resource.user.read();
    return (
        <div>
            <p>{user} 님이 작성한 글</p>
            <Suspense fallback={<div></div>}>
                <Posts resource={resource} />
            </Suspense>
        </div>
    );
}

export default User;