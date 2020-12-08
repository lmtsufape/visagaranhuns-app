import { HeaderTitle } from '@react-navigation/stack';
import React,{ useContext, useState, useEffect } from 'react';
import { Text, Header,Alert,ActivityIndicator,StyleSheet  } from 'react-native';
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
import AtualizadoIcon from '../../assets/logo_atualizado'
import SairIcon from '../../assets/logo_sair'
import getRealm from '../../services/realm';
import { CustomButtonProgramacao,LoadingIcon, CustomButtonHistorico, CustomButtonAtualizar, CustomButtonExit, CustomButtonText } from './styles';
import {useNetInfo} from '@react-native-community/netinfo';
import Api from '../../Api';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';

export default () => {

    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const netInfo = useNetInfo();
    const [loading, setLoading] = useState(false);
    const [sincroniaStatus, setSincroniaStatus] = useState('true');

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
        //limpar o asyncstorage
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
            
        //deletar todas as fotos do cel
            const realm = await getRealm();
            const imagens = realm.objects('Imagens');
            let dirs = RNFetchBlob.fs.dirs;
         /*   imagens.forEach(obj => {
                console.log("del:",obj.id, obj.inspecao_id, obj.path, obj.nome,  obj.status, obj.comentario);
                let arrayCaminho = obj.path.split('/');
                let nomeDoArquivo = arrayCaminho[arrayCaminho.length-1];
                console.log(nomeDoArquivo);
                
                
                RNFS.exists(dirs.DCIMDir +"/"+ nomeDoArquivo)
                    .then( (result) => {
                        //console.log("file exists: ", result);
                        console.log("RESULT: ",result);
                            console.log("AVISO: ",dirs.DCIMDir +"/"+ nomeDoArquivo);
                            //CameraRoll.deletePhotos(obj.path)
                            RNFS.unlink('file:///data/user/0/com.appvisa/files')
                            .then(() => {
                            console.log('FILE DELETED');
                            })
                            // `unlink` will throw an error, if the item to unlink does not exist
                            .catch((err) => {
                            console.log("ERROR:", err.message);
                            });

                    })
                    .catch((err) => {
                        console.log("error2: ",err.message);
                    });
                    
                  }); */
        //apagar todo o DB
            //apagarRealm();

        //ir para a tela de login
            navigation.reset({
                routes:[{name:'SingIn'}]
            });
            
    }
    const apagarRealm = async () => {
        const realm2 = await getRealm();
        realm2.write(() => {realm2.deleteAll()});
    }
    const handleSincronizarClick = async () => {
        const sincronia = await AsyncStorage.getItem('sincronia');
        if(sincronia == 'true'){
            Alert.alert(
                'Sincronizar',
                'Seus dados estão sincronizados!',
                [
                  {
                    text: 'Ok',
                    //onPress: () => AsyncStorage.setItem('sincronia', 'false'),
                    style: 'cancel'
                  },
                ],
                { cancelable: false }
            );
        }else{
            Alert.alert(
                'Sincronizar',
                'Deseja sincronizar os dados?',
                [
                  {
                    text: 'Não',
                    style: 'cancel'
                  },
                  { text: 'Sim', onPress: () => verificaNet() }
                ],
                { cancelable: false }
            );
        }
    }
    const verificaNet =  async() => {
        if(netInfo.isConnected) {
            sincronizarDados();
        }else{
            Alert.alert(
                'Sincronizar',
                'Verifique sua conexão e tente novamente!',
                [
                  {
                    text: 'Fechar',
                    style: 'cancel'
                  },
                ],
                { cancelable: false }
            );
        }
    }
    const sincronizarDados = async() => {
        setLoading(true)
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('status == "false"');
        //imagens.forEach(obj => {
            //verificaBD(obj.inspecao_id, obj.nome, obj.comentario).then((value) => acaoSincronizarDados(value, obj));
            //console.log(obj.inspecao_id, obj.nome, obj.comentario);
             
        //});

/*        setTimeout(() => {let imagens = realm.objects('Imagens');
                            imagens.forEach(obj => {
                                let formato = obj.path.split('.');
                                let mime = "mime/"+formato[formato.length-1];                                
                                //console.log(obj.inspecao_id, obj.path, obj.orientation, mime, obj.comentario, obj.status);
                                Api.setImg(obj.inspecao_id, obj.path, obj.nome, obj.orientation, mime, obj.comentario, obj.status);
                          });
                          //enviar dados
                          //apagar tudo
                          //baixar dados

                          //Atualizaces
                          setLoading(false);
                          let status = AsyncStorage.setItem('sincronia', 'true');
                          atualizaStatus();
                          //console.log(sincroniaStatus);
        },3000)
*/
        //quando concluir a sincronização o status muda e o icone volta ao normal
        //await AsyncStorage.setItem('sincronia', 'true');
        //setLoading(false)
        setLoading(false);
        await AsyncStorage.setItem('sincronia', 'true');
    }
    /*
    * FUNCAO: defino a ação que vai ser tomada apos a verificação 
    * ENTRADA: (boleano) value, (imagem) imagem, (string) comentario
    * SAIDA:
    */
    const acaoSincronizarDados = async(value, obj) =>{
        //não enviou a imagem e nem o comentário
        if(value.comentario == false && value.imagem == false){
            let formato = obj.path.split('.');
            let mime = "mime/"+formato[formato.length-1];                                
            let teste = await Api.setImg(obj.inspecao_id, obj.path, obj.nome, obj.orientation, mime, obj.comentario, obj.status);
            //altero o status da imagem para TRUE (já enviado)
            if(teste.status == true){
                const realm = await getRealm();
                let imagens = realm.objects('Imagens').filtered('nome == "'+obj.nome+'"');
                realm.write(() => {
                    imagens[0].status = "true";
                })
            }
        //já enviou a imagem mas nao enviou o comentario ou quer atualizar o comentário   
        }else if(value.imagem == true){
            console.log("OPA", value.comentario);
            let teste = await Api.setComentario(obj.inspecao_id, obj.nome, obj.comentario);
            if(teste.status == true){
                const realm = await getRealm();
                let imagens = realm.objects('Imagens').filtered('nome == "'+obj.nome+'"');
                realm.write(() => {
                    imagens[0].status = "true";
                })
            }
        }
    }
    /*
    * FUNCAO: verifica pela API se uma imagem/comentario já foi enviado
    * ENTRADA: (int)inspecao_id, (string)nome, (string)comentario
    * SAIDA: (boolean)true ou false para imagem e comentário
    */
    const verificaBD = async(inspecao_id, nome, comentario) => {
        const req = await Api.verifica(inspecao_id, nome, comentario);
        return req;
    }
    const atualizaStatus = async() =>{
        if(await AsyncStorage.getItem('sincronia') == "true"){
            setSincroniaStatus("true");
        }else{
            setSincroniaStatus("false");
        }
    }
    useEffect(()=>{
        //setInterval(()=> {
            atualizaStatus();
        //}, 3000)
    },[]);

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
                
                    <CustomButtonAtualizar onPress={handleSincronizarClick}>
                       
                        <CustomButtonText>Sincronizar</CustomButtonText>
                            
                        {loading == false
                            ?<AtualizarIcon width="50" />
                            :<LoadingIcon size="large" color="#fff"/>
                        }
                    </CustomButtonAtualizar>
                
                <CustomButtonExit  onPress={handleLogoutClick}>
                    <CustomButtonText>Sair do sistema</CustomButtonText>
                    <SairIcon width="50" />
                </CustomButtonExit>

            </Scroller>
        </Container>
    );
}

const styles = StyleSheet.create({
    icone:{
        width:50,
        marginTop:14,
    },
  });