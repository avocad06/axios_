import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./useSlice";

export const store = configureStore({
    reducer: {
        userSlice: userSlice
    }
})

