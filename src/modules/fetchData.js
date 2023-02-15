import axios from "axios";

function fetchUser() {

    const refresh_token = document.cookie.split('; ').find((row) => row.startsWith('refresh'))?.split('=')[1]

    let user = "hey";
    if (refresh_token) {
        const suspender = axios.get('http://127.0.0.1:8000/users/auth/')
            .then((data) => {
                user = data.data.email;
            })
            .catch((err) => { });
        return {
            read() {
                if (user === "hey") {
                    throw suspender;
                } else {
                    return user;
                }
            }
        };
    }
}

function fetchPosts() {
    let posts = null;
    const suspender = axios.get('http://127.0.0.1:8000/users/auth/')
        .then((data) => {
            posts = data.data.email;
            // setTimeout(() => {
            //     console.log(data)
            // }, 3000);
        });
    return {
        read() {
            if (posts === null) {
                throw suspender;
            } else {
                return posts;
            }
        }
    };
}

function fetchData() {
    return {
        user: fetchUser(),
        posts: fetchPosts()
    };
}

export default fetchData;