import { createSlice, current } from "@reduxjs/toolkit";

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
            state.email = action.payload.email;
            state.isLogined = true;
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