// 액션타입 만들기
// Ducks패턴
// 액션의 이름에 접두사를 넣어야 한다
// 다른 모듈과 이름이 중복되는 것을 방지
// counter 가 접두사인 거 같다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성함수 만들기
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내기
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기 상태 선언하기
const initialState = {
    number: 0,
    diff: 1,
};

// 리듀서 선언
export default function counter(state = initialState, action) {
    switch (action.type) {
        case SET_DIFF:
            return {
                ...state,
                diff: action.diff
            };
        case INCREASE:
            return {
                ...state,
                number: state.number + state.diff
            };
        case DECREASE:
            return {
                ...state,
                number: state.number - state.diff
            };
        default:
            return state;
    }
}

// 액션 타입 선언
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

// 액션 생성함수 선언
let nextId = 1; // todo 데이터에서 사용할 고유 id
export const addTodo = text => ({
    type: ADD_TODO,
    todo: {
        id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해줌
        text
    }
})
