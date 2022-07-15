import React from 'react';
import useAsync from './useAsync';
import axios from 'axios';

// useAsync 에서는 Promise의 결과를 바로 data에 담기 때문에, 
// 요청을 한 이후 response에서 data를 추출하여 반환하는 함수를 만든다.
async function getUsers() {
    const respons = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return respons.data;
}

function Users() {
    const [state, refetch] = useAsync(getUsers, []);

    const { loading, data: users, error } = state;

    if(loading) return console.log('로딩중...');
    if(error) return console.log('error');
    if(!users) return null;

    return(
        <>
            <ul>
                {users.map(user => {
                    <li key={user.id}>
                    {user.username}, ({user.name})
                    </li>
                })}
            </ul>
            <button onClick={refetch}> 다시불러오기 </button>
        </>
    )
}

export default Users;