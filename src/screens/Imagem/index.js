import React, { useState, useEffect } from 'react';
import { Container, BotaoCard, AreaComentario, InfoArea, InfoCardText, ComentarioText, InfoText, ContainerButton, CustomButtonTirarFoto, CustomButtonGaleria, CustomButtonText, LoadingIcon, ListArea } from './styles';
import { Text, Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View, FlatList, Dimensions, TextInput } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../services/realm';
import AsyncStorage from '@react-native-community/async-storage';

const WIDTH = Dimensions.get('window').width;
export default() => {
    const route = useRoute();
    const navigation = useNavigation();
    const [useInfo] = useState({
        inspecao_id: route.params.inspecao_id,
        path: route.params.path,
        comentario: route.params.comentario,
        status: route.params.status,
    });
    const [comentarioField, setComentarioField] = useState(useInfo.comentario);
    //console.log("OPA", useInfo.inspecao_id, useInfo.path, useInfo.comentario, useInfo.status, WIDTH);

    const getStatus = () => {
        if(useInfo.status === "false"){
            return "Faça um comentário!"
        }else{
            return useInfo.status
        }
    }
    const handleSalvarComentarioButtonClick = async () => {
        //console.log("OPA", comentarioField,useInfo.comentario, useInfo.inspecao_id, useInfo.path, useInfo.comentario, useInfo.status, WIDTH);
        /*const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('path == "'+useInfo.path+'"');
        console.log("ANTIGO:",imagens[0].comentario);
        realm.write(() => {
            imagens[0].comentario = comentarioField;
        });
        console.log("NOVO",imagens[0].comentario);

        */
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('path == "'+useInfo.path+'"');

        if(imagens[0].comentario == ''){
            Alert.alert(
                'Comentário',
                'Deseja salvar o comentário?',
                [
                  {
                    text: 'Não',
                    //onPress: () => console.log('Não - salvar')
                  },
                  {
                    text: 'Sim',
                    onPress: () => 
                    realm.write(() => {
                        imagens[0].comentario = comentarioField;
                        getVerificaComentario("salvar",comentarioField);
                    })
                  },
                ],
                { cancelable: false }
            );
        }else{ 
            Alert.alert(
                'Comentário',
                'Deseja atualizar o comentário?',
                [
                      {
                        text: 'Não',
                        //onPress: () => console.log('Não - atualizar')
                      },
                      {
                        text: 'Sim',
                        onPress: () => 
                        realm.write(() => {
                            imagens[0].comentario = comentarioField;
                            getVerificaComentario("atualizar",comentarioField);
                        })
                      },
                ],
                { cancelable: false }
            );
        }
        console.log("NOVO",imagens[0].comentario);
    }
    const getVerificaComentario = async (tipo,texto) => {
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('path == "'+useInfo.path+'"');
        if(imagens[0].comentario == texto){
            Alert.alert(
                'Comentário',
                'Comentário salvo com sucesso!',
                [
                      {
                        text: 'Fechar',
                        onPress: () => 
                        AsyncStorage.setItem('sincronia', 'false')
                      },
                      
                ],
                { cancelable: false }
            );
            realm.write(() => {
                imagens[0].status = "false";
            })
        }else{
            Alert.alert(
                'Ops!',
                'Por algum motivo o comentário não foi salvo, tente novamente!',
                [
                      {
                        text: 'Fechar',
                      },
                      
                ],
                { cancelable: false }
            );
        }
    }
    
    return(
        <Container>
            <InfoArea>
                <Image
                    style={styles.tinyLogo}
                    source={{uri: useInfo.path}}
                />
            </InfoArea>
            <AreaComentario>
                <InfoCardText>Comentário</InfoCardText>
                <View style={styles.containerTextArea}>
                    <TextInput style={styles.textArea}
                        multiline={true}
                        numberOfLines={4}
                        placeholder= {"Faça um comentário!"}
                        value = {comentarioField}
                        onChangeText={t=>setComentarioField(t)}
                    />
                </View>
                <BotaoCard>
                    {useInfo.comentario === ""
                        ? <CustomButtonText 
                            onPress={handleSalvarComentarioButtonClick}
                            >Salvar</CustomButtonText>
                        : <CustomButtonText 
                            onPress={handleSalvarComentarioButtonClick}
                            >Atualizar</CustomButtonText>
                    }
                </BotaoCard>
            </AreaComentario>
        </Container>
    );
}
const styles = StyleSheet.create({
    tinyLogo:{
        height: WIDTH,
    },
    containerTextArea:{
        
    },
    textArea:{
        borderWidth: 1,
        margin: 10,
        borderColor:"#a9a9a9",
        borderRadius:4,
        height:100,
        textAlignVertical: "top",
    }
  });