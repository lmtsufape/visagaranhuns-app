import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import { Text } from 'react-native';
import Api from '../../Api';

import SignInput from '../../components/SignInput'
import LogoGus from '../../assets/logo_visaGus.svg';

export default() => {
    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != ''){
            let json = await Api.signIn(emailField, passwordField);
            if(json.success == 'true'){
                //armazeno o token
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('user', JSON.stringify(json.table_data));
                await AsyncStorage.setItem('inspecoes', JSON.stringify(json.inspecoes));
                await AsyncStorage.setItem('documentos', JSON.stringify(json.documentos));
                //armazeno os dados o usuario logado
                userDispatch({
                    type:'setAvatar',
                    payload:{
                        id:json.table_data[0].id,
                        name:json.table_data[0].name,
                        email:json.table_data[0].email
                    }
                })      
                navigation.reset({
                    routes:[{name:'MainStackLogado'}]
                })
            }else{
                alert("E-mail e/ou senha errados!")
            }
        }else{
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SingUp'}]
        });
    }

    return(
        <Container>
            <LogoGus width='100%' height='140'/>
            <InputArea>
                <SignInput
                    placeholder="Digite seu e-mail"
                    value = {emailField}
                    onChangeText={t=>setEmailField(t)}
q                />
                <SignInput
                    placeholder="Digite sua senha"
                    value = {passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Entrar</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Esqueceu sua senha?</SignMessageButtonText>
                <SignMessageButtonTextBold>Clique aqui</SignMessageButtonTextBold>
            </SignMessageButton>


        </Container>
    );
}