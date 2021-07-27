import React, { useState, useEffect } from 'react';
import { Container, InfoArea, ButtonsView, CustomButton, CustomButtonText, LoadingIcon } from './styles';
import { Image, StyleSheet, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute } from '@react-navigation/native';
import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import getRealm from '../../services/realm';
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const numColumns = 3;
const WIDTH = Dimensions.get('window').width;

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [useInfo] = useState({
        inspecao_id: route.params.inspecao_id,
    });
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState(null);
    const [tempimagem, setTempImagem] = useState('')

    const renderAsset = async () => {
        setList([]);
        const realm = await getRealm();
        const imagens = realm.objects('Imagens').filtered('inspecao_id == ' + useInfo.inspecao_id);
        setList(imagens);
    }
    const pickSingWithCamera = async (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 1000,
            height: 1000,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                // console.log('received image', image);
                //sendImg(image);
                saveImgDB(image);
            })
            .catch((e) => console.log(e));

    }
    const pickSingWithGalery = async () => {
        ImagePicker.openPicker({
            cropping: true,
            width: 1000,
            height: 1000,
        })
            .then((image) => {
                // console.log('received image', image);
                //sendImg(image);
                //console.log(image.path);
                //setTempImagem(image.path);
                saveImgDB(image);
            })
            .catch((e) => console.log(e));

    }
    //salvar no banco de dados
    const saveImgDB = async (image) => {
        const realm = await getRealm();
        realm.write(() => {
            const img = realm.create('Imagens', {
                inspecao_id: useInfo.inspecao_id,
                path: image.path,
                status: 'false',
                comentario: '',
                nome: 'imagem' + Math.random() + 1,
                orientation: image.orientation,
            });
        });
        await AsyncStorage.setItem('sincronia', 'false');
        renderAsset();
    }
    const mostrar = async () => {
        const realm = await getRealm();
        const teste = realm.objects('Imagens').filtered('inspecao_id == ' + useInfo.inspecao_id);
        //console.log("quantidade: ", teste.length);
        teste.forEach(obj => {
            console.log("mostrar:", obj.id, obj.inspecao_id, obj.path, obj.status, obj.comentario);
        });

        //const sincronia = await AsyncStorage.getItem('sincronia');
        //console.log(sincronia);

    }
    //enviar para API
    const sendImg = (image) => {
        console.log(image.path);
        Api.setImg(image, useInfo.inspecao_id);
    }
    const getImg = async () => {
        setImg(useInfo.inspecao_id);
    }
    const setImg = async (id_inspecao) => {
        const inspecoes = await AsyncStorage.getItem('inspecoes');
        const insp = JSON.parse(inspecoes).findIndex(obj => obj.inspecao_id === id_inspecao);
        console.log('ANTES:', JSON.parse(inspecoes)[insp].listaImagens, JSON.parse(inspecoes)[insp].empresa_nome);
        //await AsyncStorage.setItem('inspecoes', JSON.stringify({age: 36 }));
        console.log('DEPOIS:', JSON.parse(inspecoes)[insp].listaImagens, JSON.parse(inspecoes)[insp].empresa_nome);
        return JSON.parse(inspecoes)[insp].listaImagens;
    }
    useEffect(() => {
        //mostrar();
        renderAsset();
    }, []);
    const renderItem2 = ({ item }) => (
        <Item item={item} />
    );
    const Item = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleClickImagem(item)}>
            <Image
                style={styles.tinyLogo}
                source={{ uri: item.path }}
            />
        </TouchableOpacity>
    );
    const handleClickImagem = async (item) => {
        navigation.navigate('Imagem', {
            inspecao_id: useInfo.inspecao_id,
            path: item.path,
            comentario: item.comentario,
            status: item.status,
        });
    }
    return (
        <Container>
            <InfoArea>
                <ButtonsView>
                    <CustomButton color='#d6ffe4' onPress={() => pickSingWithCamera(false)}>
                        <IonIcon name='ios-image-sharp' size={35} color='#22cc99' />
                        <CustomButtonText color='#22cc99'>Fotografar</CustomButtonText>
                    </CustomButton>
                    <CustomButton color='#d7ffd6' onPress={() => pickSingWithGalery(false)}>
                        <IonIcon name='camera' size={35} color='#4ecc22' />
                        <CustomButtonText color='#4ecc22'>Galeria</CustomButtonText>
                    </CustomButton>
                </ButtonsView>
            </InfoArea>
            {loading &&
                <LoadingIcon size="large" color="#909090" />
            }
            <FlatList
                data={list}
                renderItem={renderItem2}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        backgroundColor: "#dcda48",
        justifyContent: 'center',
        height: WIDTH / numColumns,
        width: WIDTH / numColumns,
        margin: 1,
    },
    title: {
        fontSize: 20,
    },
    tinyLogo: {
        width: WIDTH / numColumns,
        height: WIDTH / numColumns,
    }
});