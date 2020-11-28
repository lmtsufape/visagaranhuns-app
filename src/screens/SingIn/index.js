import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import { Text } from 'react-native';
import Api from '../../Api';
import getRealm from '../../services/realm';
import SignInput from '../../components/SignInput'
import LogoGus from '../../assets/logo_visaGus.svg';
import react from 'react';

export default() => {
    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const saveInspecao = async(value) => {
        let telefone2Temp='';
        if(value.telefone2 == null){
            telefone2Temp = 'null';
        }
        const realm = await getRealm();
        realm.write(() => {
            const inspecao = realm.create('Inspecoes', {
                inspecao_id: value.inspecao_id,
                empresa_nome: value.empresa_nome,
                rua: value.rua,
                numero: value.numero,
                bairro: value.bairro,
                cep: value.cep,
                cnpjcpf: value.cnpjcpf,
                representante_legal: value.representante_legal,
                telefone1: value.telefone1,
                telefone2: telefone2Temp,
                email: value.email,
                data: value.data,
                status: value.status,
                tipo: value.tipo,
                descricao: value.descricao,
            });
          });
          console.log("saveInspecao");
    }
    const saveDocumeto = async(value) => {
        let data_validadeTemp='';
        if(value.data_validade == null){
            data_validadeTemp = 'null';
        }
        const realm = await getRealm();
        realm.write(() => {
            const documento = realm.create('Documentos', {
                inspecao_id:  value.inspecao_id,
                nome: value.nome,
                caminho: value.caminho,
                data_emissao: value.data_emissao,
                data_validade: data_validadeTemp,
            });
        });
        console.log("saveDocumento");
    }

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != ''){
            let json = await Api.signIn(emailField, passwordField);
            if(json.success == 'true'){
                //armazeno o token
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('user', JSON.stringify(json.table_data));
                await AsyncStorage.setItem('inspecoes', JSON.stringify(json.inspecoes));
                //console.log(json.inspecoes[0].listaDocumentos)
                //armazeno os dados o usuario logado
                //console.log(json.inspecoes.length);

                let objs = (json.inspecoes);
                objs.forEach(obj => {
                    saveInspecao(obj);
                    let docs = obj.listaDocumentos;
                    docs.forEach(doc => {
                        saveDocumeto(doc);
                    });
                });

                /*
                const realm = await getRealm();
                realm.write(() => {
                    const inspecao = realm.create('Inspecoes', {
                        inspecao_id:  json.inspecoes.inspecao_id,
                        empresa_nome: json.inspecoes.empresa_nome,
                        rua: json.inspecoes.rua,
                        numero: json.inspecoes.numero,
                        bairro: json.inspecoes.bairro,
                        cep: json.inspecoes.cep,
                        cnpjcpf: json.inspecoes.cnpjcpf,
                        representante_legal: json.inspecoes.representante_legal,
                        telefone1: json.inspecoes.telefone1,
                        telefone2: json.inspecoes.telefone2,
                        email: json.inspecoes.email,
                        data: json.inspecoes.data,
                        status: json.inspecoes.status,
                        tipo: json.inspecoes.tipo,
                        descricao: json.inspecoes.descricao,
                    });
                  });
                  //realm.close();

                const inspecao = realm.objects('Inspecoes');
                console.log(inspecao[0].empresa_nome);
                  */
                const realm = await getRealm();
                const inspecao = realm.objects('Inspecoes');
                console.log(inspecao[0].empresa_nome, inspecao.length);

                const doc = realm.objects('Documentos');
                console.log('N TOTAL DE DOCUMENTOS', doc.length);

                //realm.close();

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