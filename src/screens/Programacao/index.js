import React, {useState, useEffect, useContext }  from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RefreshControl  } from 'react-native';

import { 
    Container,
    Scroller,
    ListArea,
    LoadingIcon,
} from './styles';
import getRealm from '../../services/realm';
import AsyncStorage from '@react-native-community/async-storage';

import EstabelecimentoItem from '../../components/EstabelecimentoItem';

export default () => {
    const { state:user } = useContext(UserContext);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getInspecoes = async () => {
        const realm = await getRealm();
        const inspecoes = realm.objects('Inspecoes');
        setList([]);
        setList(inspecoes);
    }
    useEffect(()=>{
        getInspecoes();
    },[]);

    const onRefresh = () =>{
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {loading &&
                    <LoadingIcon size="large" color="#909090"/>
                }
                    <ListArea>
                        {list.map((item, k) => (
                        <EstabelecimentoItem key={k} data={item} />
                        ))}
                    </ListArea>
            </Scroller>
        </Container>
    );
}