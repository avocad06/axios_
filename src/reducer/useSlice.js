import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk는 비동기 작업을 처리하는 액션을 만들어준다.
const asyncUpFetch = createAsyncThunk('userSlice/asyncUpFetch',
    // async () => {
    //     await axios.get('http://127.0.0.1:8000/users/auth/', { withCredentials: true })
    //         // axios.get('http://127.0.0.1:8000/users/auth/')
    //         .then((res) => {
    //             console.log(res.data.email)
    //             return { email: res.email }
    //         })
    //         .catch((err) => {
    //             return err.message
    //         })
    // }
    async () => {
        const resp = await fetch(
            'http://127.0.0.1:8000/users/auth/', {
            credentials: "include",
        }
        );
        const data = await resp.json();
        console.log(resp);
        // console.log(data)
        return data.email;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        id: null,
        email: null,
        isLogined: null,
        isLoading: false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.email = action.payload.email;
            state.isLogined = true;
            console.log("로그인:", current(state))
        },

        // 로그아웃시 user state초기화
        clearUser: (state) => {
            state.name = "";
            state.email = "";
            state.isLogined = false;
            console.log("로그아웃:", current(state))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncUpFetch.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
            state.email = action.payload
            console.log(action)
            state.status = 'complete';
            state.isLoading = true;
        })
        builder.addCase(asyncUpFetch.rejected, (state) => {
            state.status = 'rejected'
        })
    }
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
export { asyncUpFetch }