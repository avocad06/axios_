import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./useSlice";

const store = configureStore({
    reducer: {
        info: userSlice.reducer
    }
})

export default store;

