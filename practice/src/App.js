import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
import produce from 'immer';

function countActiveUsers(users) {
  console.log('활설 사용자 수를 세는증 ...');
  return users.filter(user => user.active).length;
}

export const UserDispach = React.createContext(null);
const initialState = {
  users: [
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
    },
    {
        id: 2,
        username: 'liz',
        email: 'liz@example.com',
        active: true
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false
    }
  ]
}

function reducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
  
  case 'REMOVE_USER':
    return produce(draft => {
      const index = draft.users.findIndex(user => isSecureContext.id === action.id);
      draft.users.splice(index, 1);  
  });
  }
}
function App() {
  const [{ username, email }, onChange, onReset] = useInputs({
    username: '',
    email: ''
  });
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const {users} = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    onReset();
    nextId.current += 1;
  }, [username, email, onReset]);

  const onToggle = useCallback(id => {
    dispatch({
      type: "TOGGLE_USER",
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispach.Provider value={dispatch}>
    <CreateUser
    username={username}
    email={email}
    onChange={onChange}
    onCreate={onCreate} />
    <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    <div>활성 사용자 수: {count}</div>
    </UserDispach.Provider>
  );
}

export default App;
