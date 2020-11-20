import React, { useState, useEffect } from 'react';
import { Container, InfoArea, InfoText, CustomButtonTirarFoto, CustomButtonGaleria, CustomButtonText, LoadingIcon, ListArea } from './styles';
import { Text, Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useRoute} from '@react-navigation/native';
import Api from '../../Api';
import ImagemItem from '../../components/ImagemItem';

export default() => {
    const route = useRoute();
    const [useInfo] = useState({
        inspecao_id: route.params.inspecao_id,
    });
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState(null);

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
    //enviar para API
    const sendImg  = (image) => {
        Api.setImg(image, useInfo.inspecao_id);
    }
    const getImg = async () => {
        setList([]);
        let res = await Api.getImg(useInfo.inspecao_id);
        setList(res.table_data);
    }
    useEffect(()=>{
        getImg();
    },[]);
    return(
        <Container>
            <InfoArea>
                <InfoText>Câmera</InfoText>
                <CustomButtonTirarFoto onPress={() => pickSingWithCamera(false)}>
                    <CustomButtonText>Tirar foto</CustomButtonText>
                </CustomButtonTirarFoto>
                <CustomButtonGaleria>
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