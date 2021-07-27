import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RefreshControl } from 'react-native';

import {
    Container,
    Scroller,
    ListArea,
    LoadingIcon,
    View,
    Button,
    Text
} from './styles';
import getRealm from '../../services/realm';
import AsyncStorage from '@react-native-community/async-storage';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EstabelecimentoItem from '../../components/EstabelecimentoItem';

export default () => {
    const { state: user } = useContext(UserContext);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [show, setShow] = useState(true);

    function handleShow() {
        if (show === true) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    const getInspecoes = async () => {
        const realm = await getRealm();
        const inspecoes = realm.objects('Inspecoes');
        setList([]);
        setList(inspecoes);
    }
    useEffect(() => {
        getInspecoes();
    }, []);

    const onRefresh = () => {
    }

    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return year + '-' + month + '-' + date; //yyyy-mm-dd;
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {loading &&
                    <LoadingIcon size="large" color="#909090" />
                }
                <Text margin='20px'>Hoje</Text>
                <ListArea>
                    {list.map((item, k) => (
                        item.data === getCurrentDate() ?
                            <EstabelecimentoItem key={k} data={item} />
                            : <></>
                    ))}
                </ListArea>
                <View>
                    <Text margin='5px'>Próximas</Text>
                    <Button onPress={handleShow}>
                        {show ? <EntypoIcon name='eye' size={20} color='#909090' />
                            : <EntypoIcon name='eye-with-line' size={20} color='#909090' />}
                    </Button>
                </View>
                {
                    show ?
                        <ListArea>
                            {list.map((item, k) => (
                                item.data != getCurrentDate() ?
                                    <EstabelecimentoItem key={k} data={item} />
                                    : <></>
                            ))}
                        </ListArea>
                        :
                        <></>
                }
            </Scroller>
        </Container>
    );
}