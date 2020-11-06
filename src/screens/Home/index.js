import { HeaderTitle } from '@react-navigation/stack';
import React from 'react';
import { Text, Header } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    Scroller,
    HeaderTitleBar,
    HeaderArea,
    HeaderOption,
    TitlePagina,
    OptionButton,
} from './styles';

import ApreentacaoIcon from '../../assets/logo_visagaranhuns_m.svg'
import OptionIcon from '../../assets/logo_options.svg'

import { CustomButtonProgramacao, CustomButtonHistorico, CustomButtonAtulizar, CustomButtonText } from './styles';


export default () => {

    const navigation = useNavigation();

    const handleProgramacaoClick = async () =>{
        /*navigation.reset({
            routes:[{name:'Programacao'}]
        })
        */
       navigation.navigate("Programacao")
    }
    const handleHistoricoClick = async () =>{
       navigation.navigate("Historic")
    }


    return (
        <Container>
            <Scroller>
                
                <HeaderArea>
                    <HeaderTitleBar>
                        <ApreentacaoIcon width="220"/>
                    </HeaderTitleBar>
                    <HeaderOption>
                        <OptionButton onPress={()=>alert("OPA")}>
                            <OptionIcon width="25"/>
                        </OptionButton>
                    </HeaderOption>
                </HeaderArea>

                <CustomButtonProgramacao onPress={handleProgramacaoClick}>
                    <CustomButtonText>Programação</CustomButtonText>
                </CustomButtonProgramacao>
                <CustomButtonHistorico onPress={handleHistoricoClick}>
                    <CustomButtonText>Histórico</CustomButtonText>
                </CustomButtonHistorico>
                <CustomButtonAtulizar>
                    <CustomButtonText>Atualizar</CustomButtonText>
                </CustomButtonAtulizar>

            </Scroller>
        </Container>
    );
}