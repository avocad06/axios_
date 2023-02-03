import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        isLogined: null,
        isLoading: false,
    },
    reducers: {
        loginUser: (state, action) => {
            // json payload에 있는 name 프로퍼티의 값
            
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLogined = true;
            console.log(current(state), 321)
            
        },

        // 로그아웃시 user state초기화
        clearUser: (state) => {
            state.name = "";
            state.email = "";
            state.isLogined = false;
            console.log(current(state), 486)
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;