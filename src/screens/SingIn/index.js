import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
import { Container, InputArea, CustomButton,LoadingIcon, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import { Text,Alert } from 'react-native';
import Api from '../../Api';
import getRealm from '../../services/realm';
import SignInput from '../../components/SignInput'
import LogoGus from '../../assets/logo_visaGus.svg';
import react from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

export default() => {
    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const netInfo = useNetInfo();
    const [loading, setLoading] = useState(false);

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
                email: "exemplo@teste.com",
                data: value.data,
                status: value.status,
                tipo: value.tipo,
                descricao: value.descricao,
            });
          });
          //console.log("saveInspecao");
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
        //console.log("saveDocumento");
    }
    const saveImagem = async(value) => {
        //baixar a imagem
        //console.log("OPAAA:",value);
        const caminho = await Api.getImgURL(value.imagemInspecao, value.nome);
        //console.log(caminho);
        //salvar no banco de dados
        const realm = await getRealm();
        realm.write(() => {
            const imagem = realm.create('Imagens', {
                inspecao_id:  value.inspecao_id,
                path: caminho,
                nome: value.nome,
                status: "true",
                comentario: value.descricao,
                orientation: value.orientation
            });
        });

    }

    const handleSignClick = async () => {
        setLoading(true);
        const realm2 = await getRealm();
        realm2.write(() => {realm2.deleteAll()});

        if(emailField != '' && passwordField != ''){
            if(netInfo.isConnected) {
                let json = await Api.signIn(emailField, passwordField);
                if(json.success == 'true'){
                    //armazeno o token
                    await AsyncStorage.setItem('token', json.token);
                    await AsyncStorage.setItem('user', JSON.stringify(json.table_data));
                    //await AsyncStorage.setItem('inspecoes', JSON.stringify(json.inspecoes));
                    //console.log(json.inspecoes[0].listaDocumentos)
                    //armazeno os dados o usuario logado
                    //console.log(json.inspecoes.length);

                    let objs = (json.inspecoes);
                    //console.log("OPA",objs.length);
                    if(objs.length>0){
                        objs.forEach(obj => {
                            saveInspecao(obj);

                            let docs = obj.listaDocumentos;
                            docs.forEach(doc => {
                                saveDocumeto(doc);
                                //console.log("DOC",doc);
                                
                            });

                            let imgs = obj.albumDeFotos;
                            imgs.forEach(doc => {
                                saveImagem(doc);
                                //console.log("IMG",doc);
                            });
                        });
                    }
                    await AsyncStorage.setItem('sincronia', 'true');
                    const realm = await getRealm();
                    const inspecao = realm.objects('Inspecoes');
                    const doc = realm.objects('Documentos');
                    userDispatch({
                        type:'setAvatar',
                        payload:{
                            id:json.table_data[0].id,
                            name:json.table_data[0].name,
                            email:json.table_data[0].email
                        }
                    });
                    setLoading(false);      
                    navigation.reset({
                        routes:[{name:'MainStackLogado'}]
                    })
                }else if(json.success == 'false'){
                    setLoading(false);
                    Alert.alert(
                        'Atenção!',
                        'E-mail e/ou senha errados!',
                        [
                        {
                            text: 'Fechar',
                            style: 'cancel'
                        },
                        ],
                        { cancelable: false }
                    );
                }else{
                    setLoading(false);
                    Alert.alert(
                        'Atenção!',
                        'Verifique sua conexão e tente novamente!',
                        [
                          {
                            text: 'Fechar',
                            style: 'cancel'
                          },
                        ],
                        { cancelable: false }
                    );
                }
            }
        }else{
            setLoading(false);
            Alert.alert(
                'Atenção!',
                'Preencha os campos e tente novamente!',
                [
                  {
                    text: 'Fechar',
                    style: 'cancel'
                  },
                ],
                { cancelable: false }
            );
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
                {loading == false
                    ?<CustomButton onPress={handleSignClick}>
                        <CustomButtonText>Entrar</CustomButtonText>
                    </CustomButton>
                    :<CustomButton>
                        <CustomButtonText><LoadingIcon size="large" color="#fff"/></CustomButtonText>
                    </CustomButton>
                }   
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Esqueceu sua senha?</SignMessageButtonText>
                <SignMessageButtonTextBold>Clique aqui</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}