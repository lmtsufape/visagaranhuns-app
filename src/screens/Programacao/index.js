import React, {useState, useEffect, useContext }  from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text, Header, SectionList, ActivityIndicator, RefreshControl  } from 'react-native';
import Api from '../../Api';
import { 
    Container,
    Scroller,
    HeaderTitleBar,
    HeaderArea,
    HeaderOption,
    TitlePagina,
    OptionButton,
    ListArea,
    LoadingIcon,
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import EstabelecimentoItem from '../../components/EstabelecimentoItem';
import getRealm from '../../services/realm';

export default () => {
    const { state:user } = useContext(UserContext);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    
    //console.log(inspecao[1].empresa_nome);

    const getInspecoes = async () => {
            //const userAS = await AsyncStorage.getItem('inspecoes');
        //const userASd = await AsyncStorage.getItem('documentos');
        //console.log(JSON.parse(userAS));
            //setList([]);
            //setList(JSON.parse(userAS));
        //setList(user.inspecoes);
        /*let res = await Api.getInspecoes();
        if(res.success == 'true'){
            setList(res.table_data);
            //console.log(res.table_data);
        }else{
            alert("Error: Verifique sua conexão e tente novamente!");
        }
        */
        const realm = await getRealm();
        const inspecao = realm.objects('Inspecoes');
        setList([]);
        setList(inspecao);


    }
    useEffect(()=>{
        getInspecoes();
    },[]);

    const onRefresh = () =>{
        //setRefreshing(false);
        //getInspecoes();
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