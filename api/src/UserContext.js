import React, { createContext, useReducer, useContext } from 'react';
import { init } from 'react-async';

// UsersContext에서 사용 할 기본 상태
const initialState = {
    users: {
        loading: false,
        data: null,
        error: null
    },
    user: {
        loading: false,
        data: null,
        error: null
    }
}

//로딩중일때 바뀔 상태 객체
const loadingState ={
    loading: true,
    data: null,
    error: null
};

//성공했을 때의 상태 만들어주는 함수
const success = data => ({
    loading: false,
    data,
    error: null
})

//실패했을 때의 상태
const error = error => ({
    loading:false,
    data: null,
    error: error
});

//위에서 만든 객체/유틸 함수들을 사용하여 리듀서 작성
function usersReducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: loadingState
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: success(action.data)
            };
        case 'GET_USERS_ERROR':
            return {
                ...state,
                users: error(action.error)
            };
            case 'GET_USER':
                return {
                  ...state,
                  user: loadingState
                };
              case 'GET_USER_SUCCESS':
                return {
                  ...state,
                  user: success(action.data)
                };
              case 'GET_USER_ERROR':
                return {
                  ...state,
                  user: error(action.error)
                };
              default:
                throw new Error(`Unhanded action type: ${action.type}`);
    }
}

//state 용 Context와 Dispatch용 Context 따로 만들어주기
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ childern }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {childern}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    );
}

// State를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useUserState() {
    const state = useContext(UsersStateContext);
    if(!state) {
        throw new Error(`Cannot find UsersProvider`);
    }
    return state;
}

// Dispatch를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useUserDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if(!dispatch) {
        throw new Error(`Cannot find UsersProvider`);
    }
    return dispatch;
}
