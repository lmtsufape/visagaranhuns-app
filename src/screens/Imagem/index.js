import React, { useState, useEffect } from 'react';
import { Container, BotaoCard, AreaComentario, InfoArea, InfoCardText, Cabecalho, BotaoDeletar, ComentarioText, InfoText, ContainerButton, CustomButtonTirarFoto, CustomButtonGaleria, CustomButtonText, LoadingIcon, ListArea } from './styles';
import { Text, Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View, FlatList, Dimensions, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../services/realm';
import AsyncStorage from '@react-native-community/async-storage';
import LixeiraIcon from '../../assets/logo_lixo.svg';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default () => {
    const regex = /(<([^>]+)>)/ig;
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
        if (useInfo.status === "false") {
            return "Faça um comentário!"
        } else {
            return useInfo.status
        }
    }
    const handleDeletarImagemButtonClick = async () => {
        Alert.alert(
            'Deletar',
            'Deseja deletar essa imagem?',
            [
                {
                    text: 'Não',
                    //onPress: () => console.log('Não - salvar')
                },
                {
                    text: 'Sim',
                    onPress: () => deletarImagem()
                },
            ],
            { cancelable: false }
        );
    }
    const deletarImagem = async () => {
        modificoStatus(); //função para modifcar o status geral
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('path == "' + useInfo.path + '"');
        realm.write(() => {
            realm.delete(imagens)
        });
        Alert.alert(
            'Imagem',
            'Imagem deletada com sucesso!',
            [
                {
                    text: 'Ok',
                    onPress: () => navigation.navigate("Inspecionar", {
                        inspecao_id: useInfo.inspecao_id,
                    })
                },
            ],
            { cancelable: false }
        );
    }
    const modificoStatus = async () => {
        const realm = await getRealm();
        let contador = realm.objects('Imagens').filtered('status == "false"');
        if (contador.length == 1) {
            if (contador[0].path === useInfo.path) {
                AsyncStorage.setItem('sincronia', 'true');
            } else {
                AsyncStorage.setItem('sincronia', 'false');
            }
        } else if (contador.length > 1) {
            AsyncStorage.setItem('sincronia', 'false')
        }
    }
    const handleSalvarComentarioButtonClick = async () => {
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('path == "' + useInfo.path + '"');

        if (imagens[0].comentario == '') {
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
                                getVerificaComentario("salvar", comentarioField);
                            })
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                'Comentário',
                'Deseja atualizar o comentário?',
                [
                    {
                        text: 'Não',
                    },
                    {
                        text: 'Sim',
                        onPress: () =>
                            realm.write(() => {
                                imagens[0].comentario = comentarioField;
                                getVerificaComentario("atualizar", comentarioField);
                            })
                    },
                ],
                { cancelable: false }
            );
        }
    }
    const getVerificaComentario = async (tipo, texto) => {
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('path == "' + useInfo.path + '"');
        if (imagens[0].comentario == texto) {
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
        } else {
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
    useEffect(() => {
        //setInterval(()=> {
        console.log(useInfo.status);
        //}, 3000)
    }, []);
    return (
        <Container>
            <InfoArea>
                <Image
                    style={styles.tinyLogo}
                    source={{ uri: useInfo.path }}
                />
            </InfoArea>
            {useInfo.status == "false"
                ? <AreaComentario>
                    <Cabecalho>
                        <InfoCardText>Comentário</InfoCardText>
                        {useInfo.status === "false"
                            ? <BotaoDeletar onPress={handleDeletarImagemButtonClick}>
                                <LixeiraIcon width="20" style={styles.lixeiraIcon} />
                            </BotaoDeletar>
                            : <Text></Text>
                        }
                    </Cabecalho>
                    <View style={styles.containerTextArea}>
                        <TextInput style={styles.textArea}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={"Faça um comentário!"}
                            value={comentarioField.replace(regex, '')}
                            onChangeText={t => setComentarioField(t)}
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
                : <AreaComentario>
                    <Cabecalho>
                        <InfoCardText>Comentário</InfoCardText>
                    </Cabecalho>
                    <View style={styles.containerTextArea}>
                        <Text style={styles.campo}>{comentarioField.replace(regex, '')}</Text>
                    </View>
                    <View style={styles.containerTextArea}>
                        <Text style={styles.campoRodape}>Essa imagem foi sincronizada, para editar ou deletar acesse o site!</Text>
                    </View>
                </AreaComentario>
            }
        </Container>
    );
}
const styles = StyleSheet.create({
    tinyLogo: {
        height: WIDTH,
    },
    containerTextArea: {

    },
    textArea: {
        borderWidth: 1,
        margin: 10,
        borderColor: "#a9a9a9",
        borderRadius: 4,
        height: (HEIGHT - WIDTH) - 190,
        textAlignVertical: "top",
    },
    lixeiraIcon: {
        paddingTop: -20,
    },
    campo: {
        height: (HEIGHT - WIDTH) - 190,
        margin: 20,
    },
    campoRodape: {
        margin: 20,
        color: '#909090',
    }
});