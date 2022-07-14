import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({name: '', nickname: ''});
    const nameInput = useRef();
    const { name, nickname } = inputs;
    const onChange = e => {
        const { value, name } = e.target;
        setInputs({
            ...inputs, //기존의 input복사
            [name]: value
        }); 
    }
    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        })
        nameInput.current.focus(); //초기화시에 ref로 이동
    }
    
    return (<div>
        <input name="name" placeholder='이름' onChange={onChange} value={name} ref={nameInput}></input>
        
        <input name="nickname" placeholder='닉네임' onChange={onChange} value={nickname}></input>
        <button onClick={onReset}>초기화</button>
        <div>
            <b>값: </b>
            {name} {nickname}
            </div>
    </div>)
}

export default InputSample;