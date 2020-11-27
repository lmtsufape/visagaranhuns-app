import React from 'react';
import styled from 'styled-components/native';
import Api from '../../App';
import {Modal} from 'react-native';

const Area = styled.TouchableOpacity``;
const Foto = styled.Image`
    resizeMode:contain;
    height:100px;
    width:100px;
    backgroundColor:#909090;
    marginBottom:30px;
    margin:5px;
`;
const handleClick = () => {
    //console.log("OPAA");
}

//1 e 3 | 6 e 8
export default ({data}) => {
    console.log(data);
    const base = 'http://192.168.0.106';
    return(
        <Area onPress={handleClick}>
            <Foto source={{uri: 'data:image/jpeg;base64,' + data}}/>
        </Area>
    );
}