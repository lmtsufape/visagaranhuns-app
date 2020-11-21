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
        setList([]);
        const documentos = await AsyncStorage.getItem('documentos');
        //console.log(JSON.parse(documentos).length)
        let cont = 0;
        for(let i = 0; i < JSON.parse(documentos).length; i++){
            if(JSON.parse(documentos)[i].inspecao_id === useInfo.inspecao_id){
                setList(JSON.parse(documentos));
            }
            cont=cont+1;
        }
        if(cont == JSON.parse(documentos).length){
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