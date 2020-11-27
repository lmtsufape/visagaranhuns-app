import React, { useState, useEffect } from 'react';
import { Container, InfoArea, InfoText, CustomButtonTirarFoto, CustomButtonGaleria, CustomButtonText, LoadingIcon, ListArea } from './styles';
import { Text, Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useRoute} from '@react-navigation/native';
import Api from '../../Api';
import ImagemItem from '../../components/ImagemItem';
import AsyncStorage from '@react-native-community/async-storage';

export default() => {
    const route = useRoute();
    const [useInfo] = useState({
        inspecao_id: route.params.inspecao_id,
    });
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState(null);
    const [tempimagem, setTempImagem] = useState('')

    const renderAsset = (image) => {
        return renderImage(image);
    }
    const renderImage = (image) => {
        return (
            <Image
                style={{width:100, height:100, resizeMode:'contain', backgroundColor:'red'}}
                source={{image}}
            />
        );
    }
    const pickSingWithCamera = async (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            cropping: cropping,
            width:500,
            height:500,
            includeExif: true,
            mediaType,
        })
        .then((image) => {
           // console.log('received image', image);
            sendImg(image);
        })
        .catch((e) => console.log(e));

    }
    const pickSingWithGalery = async () => {
        ImagePicker.openPicker({
            cropping: true,
            width:1000,
            height:1000,
        })
        .then((image) => {
           // console.log('received image', image);
            //sendImg(image);
            console.log(image.path);
            setTempImagem(image.path);
        })
        .catch((e) => console.log(e));

    }
    //enviar para API
    const sendImg  = (image) => {
        console.log(image.path);
        Api.setImg(image, useInfo.inspecao_id);
    }
    const getImg = async () => {
        //setList(tempimagem);
        //let res = await Api.getImg(useInfo.inspecao_id);
        //setList(res.table_data);
        //console.log("ID_INSPECAO:",useInfo.inspecao_id);
        //const inspecoes = await AsyncStorage.getItem('inspecoes');
        //console.log(JSON.parse(inspecoes));
        setImg(useInfo.inspecao_id);
    }
    const setImg = async (id_inspecao) => {
        const inspecoes = await AsyncStorage.getItem('inspecoes');
        const insp = JSON.parse(inspecoes).findIndex(obj => obj.inspecao_id === id_inspecao);
        console.log('ANTES:',JSON.parse(inspecoes)[insp].listaImagens, JSON.parse(inspecoes)[insp].empresa_nome);
        //await AsyncStorage.setItem('inspecoes', JSON.stringify({age: 36 }));
        console.log('DEPOIS:',JSON.parse(inspecoes)[insp].listaImagens, JSON.parse(inspecoes)[insp].empresa_nome);
        //console.log('GERAL:',JSON.parse(inspecoes)[insp]);
        //console.log(JSON.parse(inspecoes));
        //const teste = inspecoes;
        return JSON.parse(inspecoes)[insp].listaImagens;
    }
    useEffect(()=>{
        getImg();
        //console.log(route.params);
        //console.log("antes:",inspecoes);
        //pego os dados atuais e jogo no setState
        //se tiver uma modificação eu altero o setState e depois atualizo o route
              
    },[]);
    return(
        <Container>
            <InfoArea>
                <InfoText>Câmera</InfoText>
                <CustomButtonTirarFoto onPress={() => pickSingWithCamera(false)}>
                    <CustomButtonText>Fotografar</CustomButtonText>
                </CustomButtonTirarFoto>
                <CustomButtonGaleria onPress={() => pickSingWithGalery(false)}>
                    <CustomButtonText>Abrir galeria</CustomButtonText>
                </CustomButtonGaleria>
            </InfoArea>
            {loading &&
                <LoadingIcon size="large" color="#909090"/>
            }
            <ListArea>
                {list.map((item,k) => (
                    <ImagemItem key={k} data={item}/>
                ))}
            </ListArea>
            
        </Container>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
});