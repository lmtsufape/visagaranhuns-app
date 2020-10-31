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
                //await AsyncStorage.setItem('token', json.token);
                /*userDispatch({
                    type:'setAvatar',
                    payload:{
                        perfil:json.table_data[0].id
                    }
                })
                */
                
                navigation.reset({
                    routes:[{name:'MainTab'}]
                })
                
                
                //console.log(json.table_data[0].id);
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
                />
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