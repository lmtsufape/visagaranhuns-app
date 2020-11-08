import React, {useState, useEffect}  from 'react';
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

import EstabelecimentoItem from '../../components/EstabelecimentoItem';

export default () => {
    //const [loading, setLoading] = useState(null);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getInspecoes = async () => {
        setList([]);
        let res = await Api.getInspecoes();
        if(res.success == 'true'){
            setList(res.table_data);
            //console.log(res.table_data);
        }else{
            alert("Error: Verifique sua conexão e tente novamente!");
        }
    }
    useEffect(()=>{
        getInspecoes();
    },[]);

    const onRefresh = () =>{
        setRefreshing(false);
        getInspecoes();

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