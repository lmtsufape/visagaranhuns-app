import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.ScrollView` 
    flex:1;
    flexDirection:column;
    padding:20px;
`;
export const InfoAreaEstabelecimento = styled.View`
    background-color:#fff;
    margin-bottom:20px;
    border-radius:8px;
    padding:15px;
    shadowOpacity: 0.27;
    elevation: 6;
`;
export const InfoAreaInspecao = styled.View`
    background-color:#fff;
    margin-bottom:20px;
    border-radius:8px;
    padding:15px;
    shadowOpacity: 0.27;
    elevation: 6;
    marginBottom:50px;
    paddingBottom:20px;
`;
export const InfoAreaEstabelecimentoText = styled.Text`
    marginTop:10px;
    fontWeight:bold;
    fontSize:18px;
    marginBottom:5px;
`;
export const InfoCardText = styled.Text`
    fontSize:16px;
`;
export const InfoAreaInspecaoText = styled.Text`
    marginTop:10px;
    fontWeight:bold;
    fontSize:18px;
    marginBottom:5px;
`;
export const CustomButtonDocumentacao = styled.TouchableOpacity`
    background-color: #88B6B6;
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
    margin-top:28px;
`;
export const CustomButtonInspecao = styled.TouchableOpacity`
    background-color: #71CC71;
    border-radius:12px;
    justify-content:space-between;
    flex-direction:row
    padding:25px;
    margin-top:15px;
    shadowOpacity: 0.27;
    elevation: 5;
`;