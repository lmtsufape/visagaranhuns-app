import { HeaderTitle } from '@react-navigation/stack';
import React,{ useContext } from 'react';
import { Text, Header } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
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
import ProgramacaoIcon from '../../assets/logo_calendario'
import HistoricoIcon from '../../assets/logo_historico'
import AtualizarIcon from '../../assets/logo_atualizar'
import SairIcon from '../../assets/logo_sair'
import getRealm from '../../services/realm';
import { CustomButtonProgramacao, CustomButtonHistorico, CustomButtonAtulizar, CustomButtonExit, CustomButtonText } from './styles';


export default () => {

    const { dispatch: userDispatch} = useContext(UserContext);
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
    const handleLogoutClick = async () =>{
            let novoId = "";
            let novoName = "";
            let novoEmail = "";
            let novoToken = "";

            await AsyncStorage.setItem('token',novoToken);

            userDispatch({
                type:'setAvatar',
                payload:{
                    id:novoId,
                    name:novoName,
                    email:novoEmail,
                }
            })    
            
            const realm = await getRealm();
            realm.write(() => {realm.deleteAll()});

            navigation.reset({
                routes:[{name:'SingIn'}]
            })
    }


    return (
        <Container>
            <Scroller>
                
                <HeaderArea>
                    <HeaderTitleBar>
                        <ApreentacaoIcon width="220"/>
                    </HeaderTitleBar>
                    
                </HeaderArea>

                <CustomButtonProgramacao onPress={handleProgramacaoClick}>
                    <CustomButtonText>Programação</CustomButtonText>
                    <ProgramacaoIcon width="50" />
                </CustomButtonProgramacao>
                
                <CustomButtonAtulizar>
                    <CustomButtonText>Sincronizar</CustomButtonText>
                    <AtualizarIcon width="50" />
                </CustomButtonAtulizar>
                <CustomButtonExit  onPress={handleLogoutClick}>
                    <CustomButtonText>Sair do sistema</CustomButtonText>
                    <SairIcon width="50" />
                </CustomButtonExit>

            </Scroller>
        </Container>
    );
}