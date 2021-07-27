import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
`;

export const ListArea = styled.View`
    margin-top:15px;
    margin-bottom:10px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top:50px;
`;

export const Scroller = styled.ScrollView`
`;

export const Text = styled.Text`
    font-size: 18px;
    color: #909090;
    margin-top: ${props => props.margin};
    margin-horizontal: 15px;
`;

export const View = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    margin-right: 5px;
`;

export const Button = styled.TouchableOpacity`

`;