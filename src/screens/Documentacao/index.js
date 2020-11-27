import React, {useState, useEffect, useContext }  from 'react';
import { Container,ListArea,LoadingIcon } from './styles';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentoItem from '../../components/DocumentoItem';
import {useRoute} from '@react-navigation/native';


export default() => {
    const route = useRoute();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [useInfo] = useState({
        inspecao_id: route.params.inspecao_id,
    });
    const getDocumentos = async () => {
        //console.log(route.params.listaDocumentos);
        setList([]);
        const documentos = await AsyncStorage.getItem('documentos');
        const inspecoes = await AsyncStorage.getItem('inspecoes');
        //console.log(JSON.parse(documentos).length)
        //console.log(JSON.parse(inspecoes)[0].listaDocumentos);
        setList(route.params.listaDocumentos);
        if(route.params.listaDocumentos.length >0){
            setLoading(false);
        }
    }

    useEffect(()=>{
        getDocumentos();
    },[]);

    return(
        <Container>
            {loading &&
                <LoadingIcon size="large" color="#909090"/>
            }
            <ListArea>
                {list.map((item, k) => (
                <DocumentoItem key={k} data={item} />
                ))}
            </ListArea>
        </Container>
    );
}