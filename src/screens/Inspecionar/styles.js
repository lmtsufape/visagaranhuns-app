import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    padding: 15px;
`;
export const InfoArea = styled.View`
    background-color: #f7f7f8;
    margin-bottom:20px;
    border-radius:8px;
    padding:5px;
    margin:10px;
`;

export const ButtonsView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin-top: 15px;
    margin-right: 5px;
`;

export const CustomButton = styled.TouchableOpacity`
    width: 150px;
    background-color: ${props => props.color};
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    padding: 15px;
    margin: 10px;
`;

export const CustomButtonText = styled.Text`
    font-size: 16px;
    color: ${props => props.color};
    margin:5px;
`;

export const InfoText = styled.Text`
    font-size:20px;
    color:black;
    font-weight:bold;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top:50px;
`;
export const ListArea = styled.View`
`;
export const InfoCardText = styled.Text`
    fontSize:16px;
`;
export const InfoAreaEstabelecimento = styled.View`
    background-color:#fff;
    margin-bottom:20px;
    border-radius:8px;
    padding:15px;
    shadowOpacity: 0.27;
    elevation: 6;
`;
export const InfoAreaEstabelecimentoText = styled.Text`
    marginTop:10px;
    fontWeight:bold;
    fontSize:18px;
    marginBottom:5px;
`;
export const CustomButtonImagem = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    backgroundColor:#909090;
    margin-bottom:10px;
`;
export const AreaButton = styled.View`
    flex-direction:row;
    justify-content:center;
`;
