import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    padding-horizontal: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    justify-content: space-between;
`;

export const OptionButton = styled.TouchableOpacity`
    width:26px;
    height:56px;
    marginBottom:-95px;
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

export const LoadingIcon = styled.ActivityIndicator`
`;

export const CustomButton = styled.TouchableOpacity`
    marginTop: 8px;
    background-color: ${props => props.color};
    border-radius: 12px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-vertical: 30px;
    padding-horizontal: 25px;
    shadowOpacity: 0.27;
    elevation: 5;
    marginBottom: 8px;
`;

export const CustomButtonText = styled.Text`
    font-size: ${props => props.font};
    color: ${props => props.color};
`;

export const View = styled.View`
`;

export const FooterView = styled.View`
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
`;

export const ImageView = styled.View`
    flex-direction: row;
    margin-top: 10px;
    align-items: center;
`;

export const Image = styled.Image`
    height: ${props => props.height};
    width: ${props => props.width};
    margin-left: 5px;
    margin-right: 5px;
`;
