import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.ScrollView` 
    flex: 1;
    padding: 10px;
`;
export const InfoArea = styled.View`
    background-color: #f7f7f8;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;
`;

export const DataView = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const TitleView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin-right: 5px;
`;

export const Title = styled.Text`
    margin-top: 5px;
    margin-vertical:5px;
    fontWeight:bold;
    fontSize:18px;
`;

export const Text = styled.Text`
    margin: 2px;
    color: ${props => props.color};
    fontSize: 14px;
`;

export const Div = styled.View`
    margin-top: 15px;
    border: 0.5px;
    border-color: #d9d9d9;
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