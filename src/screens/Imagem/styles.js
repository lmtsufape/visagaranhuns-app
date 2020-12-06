import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1; 
`;
export const InfoArea = styled.View`
    margin-bottom:20px;
    border-radius:8px;
    flex:1;
`;
export const ContainerButton = styled.View`
    flexDirection:row;
`;
export const AreaComentario = styled.View`
    background-color:#fff;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    paddingTop:10px;
`;
export const CustomButtonTirarFoto = styled.TouchableOpacity`
    background-color: #88c425;
    border-radius:12px;
    padding:25px;
    shadowOpacity: 0.27;
    elevation: 5;
    marginLeft:6px;
`;
export const CustomButtonGaleria = styled.TouchableOpacity`
    background-color: #1b676b;
    border-radius:12px;
    padding:25px;
    shadowOpacity: 0.27;
    elevation: 5;
    marginLeft:10px;
`;
export const CustomButtonText = styled.Text`
    font-size:18px;
    color:#fff;
    font-weight:bold;
    textAlign:center;
    margin-top:12px;
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
    padding-left:15px;
    fontSize:18px;
`;
export const InfoAreaEstabelecimento = styled.View`
    background-color:#909090;
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
export const BotaoCard = styled.TouchableOpacity`
    height: 50px;
    backgroundColor:#00b300;
    margin-bottom:10px;
    margin-left:10px;
    margin-right:10px;
    border-radius:8px;
    shadowOpacity: 0.27;
    elevation:4;
`;