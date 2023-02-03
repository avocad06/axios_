import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./useSlice";

const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer
    }
})

export default store;

