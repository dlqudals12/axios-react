import { createStore } from 'redux';

/* createStore는 스토어를 만들어주는 함수이다. */
/* 리엑트 프로젝트에서는 단 하나의 스토어를 말한다. */

/* 리덕스에서 관리 할 상태 정의(초기 상태) */
const initialState = {
    counter: 0,
    text: '',
    list: []
};

/* 액션 타입 정의 */
//액션 타입은 주로 대문자로 작성한다.
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

/* 액션 생성함수 정의 */
/* 액션 생성함수는 주로 camelCase로 작성한다. */
function increase() {
    return {
        type: INCREASE //액션 전체에는 type값이 필수이다.
    }
}

const decrease = () => ({
        type:DECREASE
    }
);

const chageText = text => ({
    type: CHANGE_TEXT,
    text //액션 안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있다.
});

const add_To_List = item => ({
    type: ADD_TO_LIST,
    item
});

/* 리듀서 만들기 */
// 위 액션 생성 함수들을 통해 만들어진 객체들을 참조하여 새로운 상태를 만드는 만수를 만든다.
// 리듀서에는 불변성을 꼭 지켜야 한다.
function reducer(state = initialState, action) {
    //initialState -> state의 초기값
    switch (action.type) {
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            }
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text
            };
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item)
            };
        default:
            return state;
    }
}

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState()); //현재 store안에 들어있는 상태를 조회한다.

// 스토어 안에 들어있는 상태가 바뀔 때 마다 listener함수
const listener = () => {
    const state = store.getState();
    console.log(state);
};

//구독을 해재하고 싶을 때는 이 함수를 호출
const unsubscribe = store.subscibe(listener);

//액선 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(chageText('안녕하세요'));
store.dispatch(add_To_List({ id: 1, text: 'Link' }));