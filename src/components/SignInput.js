import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width:100%;
    height:60px;
    flex-direction:row;
    border-radius: 12px;
    padding-left: 15px;
    margin-bottom:15px;
    background-color:#f2f2f2;
`;

const Input = styled.TextInput`
    flex:1;
    font-size:16px;
    margin-left:10px;
`;

export default ({placeholder, value, onChangeText, password}) =>{
    return (
        <InputArea>
        <Input
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={password}
        />
        
        </InputArea>
    );
}