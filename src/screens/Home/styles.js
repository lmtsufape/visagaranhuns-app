import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex:1;
    background-color:#fff;
    `;

export const Scroller = styled.ScrollView`
    flex:1;
    padding:20px;
    
    marginTop:-95px;
    background-color:#fff;
`;

export const HeaderArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items: center;
`;

export const HeaderTitleBar = styled.Text`
    marginTop:43px;`;

export const HeaderOption = styled.Text`
    marginTop:43px;`;

export const OptionButton = styled.TouchableOpacity`
    width:26px;
    height:56px;
    marginBottom:-95px;
`;

export const CustomButtonProgramacao = styled.TouchableOpacity`
    background-color: #D88366;
    border-radius:12px;
    justify-content:space-between;
    flex-direction:row
    padding:25px;
    shadowOpacity: 0.27;
    elevation: 5;
`;
export const CustomButtonHistorico = styled.TouchableOpacity`
    marginTop:20px;
    background-color: #88B6B6;
    border-radius:12px;
    justify-content:space-between;
    flex-direction:row
    padding:25px;
    shadowOpacity: 0.27;
    elevation: 5;
`;
export const CustomButtonAtulizar = styled.TouchableOpacity`
    marginTop:20px;
    background-color: #E2CF5E;
    border-radius:12px;
    justify-content:space-between;
    flex-direction:row
    padding:25px;
    shadowOpacity: 0.27;
    elevation: 5;
`;
export const CustomButtonExit = styled.TouchableOpacity`
    marginTop:20px;
    background-color: #B5CC71;
    border-radius:12px;
    justify-content:space-between;
    flex-direction:row
    padding:25px;
    shadowOpacity: 0.27;
    elevation: 5;
    marginBottom:20px;

`;
export const CustomButtonText = styled.Text`
    font-size:18px;
    color:#fff;
    margin-top:28px;
`;


