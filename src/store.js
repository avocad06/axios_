
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

// createSlice로 슬라이스 만들기
// 슬라이스는 필요한 객체들이 있음.
// 객체를 전달
const store = configureStore({
    // reducer 단수형
    // 각각의 슬라이스의 reducer들이 들어가면됨.
    reducer: {
        // counter의 모든 reducer를 하나로 합쳐줌.(counter에 대한 reducer다.)
        counter: counterSlice.reducer,
    }
});

export default store;