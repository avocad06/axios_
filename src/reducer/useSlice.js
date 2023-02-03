import { createSlice } from "@reduxjs/toolkit";
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
            
        },

        // 로그아웃시 user state초기화
        clearUser: (state) => {
            state.name = "";
            state.id = "";
            state.isLogined = false;
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;