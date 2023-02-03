import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    // store는 초기값이 필요하니까 initialState
    initialState: { value: 0 },
    // reducers 복수형
    reducers: {
        // up 타입일 때 처리해야하는 reducer 함수
        up: (state, action) => {
            // 이전에는 불변성을 지키기 위해 복제를 했지만,
            state.value = state.value + action.payload;

        }

    }
});

export default counterSlice
// 액션은 간결한게 좋으니까
export const { up } = counterSlice.actions;