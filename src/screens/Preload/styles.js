import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';


export const Container = styled.SafeAreaView`
    background-color: #fff;
    flex:1;
    justify-content: center;
    align-items: center;
    padding-top:35%;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top:15px;
    margin-bottom:120px;
`;

export const LoadingIconLMTS = styled.ActivityIndicator`
    margin-top:50px;
`;
