import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
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
    height:90px;
    background-color: #32cd32;
    border-radius:12px;
    justify-content:center;
    align-items:center;
    marginTop:20px;
`;
export const CustomButtonHistorico = styled.TouchableOpacity`
    height:90px;
    background-color: #32cd32;
    border-radius:12px;
    justify-content:center;
    align-items:center;
    marginTop:20px;
`;
export const CustomButtonAtulizar = styled.TouchableOpacity`
    height:90px;
    background-color: #32cd32;
    border-radius:12px;
    justify-content:center;
    align-items:center;
    marginTop:20px;
`;
export const CustomButtonText = styled.Text`
    font-size:18px;
    color:#fff;
`;

/*
Scroller,
HeaderArea,
HeaderTitle,
HeaderOption,
TitlePagina,
SearchButton,
*/



