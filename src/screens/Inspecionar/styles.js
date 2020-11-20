import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    
    padding:20px;
`;
export const InfoArea = styled.View`
    background-color:#fff;
    margin-bottom:20px;
    border-radius:8px;
    padding:15px;
    shadowOpacity: 0.27;
    elevation: 6;
`;
export const CustomButtonTirarFoto = styled.TouchableOpacity`
    background-color: #88c425;
    border-radius:12px;
    justify-content:space-between;
    flex-direction:row
    padding:25px;
    margin-top:20px;
    shadowOpacity: 0.27;
    elevation: 5;
`;
export const CustomButtonGaleria = styled.TouchableOpacity`
    background-color: #1b676b;
    border-radius:12px;
    justify-content:space-between;
    flex-direction:row
    padding:25px;
    margin-top:20px;
    shadowOpacity: 0.27;
    elevation: 5;
`;
export const CustomButtonText = styled.Text`
    font-size:18px;
    color:#fff;
    font-weight:bold;
    textAlign:center;
`;
export const InfoText = styled.Text`
    font-size:18px;
    color:black;
    font-weight:bold;
    textAlign:center;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top:50px;
`;
export const ListArea = styled.View`
    flex:1;
    flexDirection:column;
`;
