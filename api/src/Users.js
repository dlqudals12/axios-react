import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const fetchUsers = async () => {
        try {
            //요청 시작시 error와 user초기화
            setError(null);
            setUsers(null);
            //loading 상태를 true로 바꾼다.
            setLoading(true);
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            console.log(response);
            setUsers(response.data); // data는 response.date안에 들어있다. User정보 불러오기
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    if (loading) return <div> 로딩중... </div>;
    if (error) return <div> 에러가 발생했습니다. </div>;
    if (!users) return null;
    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시불러오기</button>
        </>
    );
}

export default Users;