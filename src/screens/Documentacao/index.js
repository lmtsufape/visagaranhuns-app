import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Container, ListArea, LoadingIcon } from './styles';
import DocumentoItem from '../../components/DocumentoItem';
import { useRoute } from '@react-navigation/native';
import getRealm from '../../services/realm';


export default () => {
    const route = useRoute();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [useInfo] = useState({
        inspecao_id: route.params.inspecao_id,
    });
    const getDocumentos = async () => {
        setList([]);

        const realm = await getRealm();
        const documentos = realm.objects('Documentos').filtered('inspecao_id == ' + useInfo.inspecao_id);
        setList(documentos)
        if (documentos.length <= 0) {

            Alert.alert(
                'Atenção',
                'Nenhum documento para essa inspeção foi encontrado',
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: false }
            );
        }
        setLoading(false);
    }

    useEffect(() => {
        getDocumentos();
    }, []);

    return (
        <Container>
            {loading &&
                <LoadingIcon size="large" color="#909090" />
            }
            <ListArea>
                {list.map((item, k) => (
                    <DocumentoItem key={k} data={item} />
                ))}
            </ListArea>
        </Container>
    );
}