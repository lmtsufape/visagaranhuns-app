import React, {useState, useEffect}  from 'react';
import { Text, Header, SectionList, ActivityIndicator } from 'react-native';
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
} from './styles';

import EstabelecimentoItem from '../../components/EstabelecimentoItem';

export default () => {
    //const [loading, setLoading] = useState(null);
    const [list, setList] = useState([]);

    const getInspecoes = async () => {
        setList([]);
        let res = await Api.getInspecoes();
        if(res.success == 'true'){
            console.log(res.table_data);
            setList(res.table_data);
        }else{
            alert("Error: Verifique sua conexão e tente novamente!");
        }
    }
    useEffect(()=>{
        getInspecoes();
    },[]);

    return (
        <Container>
                <ListArea>
                    {list.map((item, k) => (
                       <EstabelecimentoItem key={k} data={item} />
                    ))}
                </ListArea>
        </Container>
    );
}