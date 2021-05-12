import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Scroller,
    HeaderTitleBar,
    HeaderArea,
} from './styles';

import ApreentacaoIcon from '../../assets/logo_visagaranhuns_m.svg'
import ProgramacaoIcon from '../../assets/logo_calendario'
import AtualizarIcon from '../../assets/logo_atualizar'
import SairIcon from '../../assets/logo_sair'
import getRealm from '../../services/realm';
import { CustomButtonProgramacao, LoadingIcon, CustomButtonHistorico, CustomButtonAtualizar, CustomButtonExit, CustomButtonText } from './styles';
import { useNetInfo } from '@react-native-community/netinfo';
import Api from '../../Api';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const netInfo = useNetInfo();
    const [loading, setLoading] = useState(false);
    const [sincroniaStatus, setSincroniaStatus] = useState('true');

    const handleProgramacaoClick = async () => {
        /*navigation.reset({
            routes:[{name:'Programacao'}]
        })
        */
        navigation.navigate("Programacao")
    }

    const handleHistoricoClick = async () => {
        navigation.navigate("Historic")
    }

    const handleLogoutClick = async () => {
        Alert.alert(
            'Sair do aplicativo',
            'Você deseja sair do aplicativo? -Recomentamos que você sincronize seus dados antes de sair do aplicativo!',
            [
                {
                    text: 'Não',
                    //onPress: () => console.log('Não - salvar')
                },
                {
                    text: 'Sim',
                    onPress: () => { handlerSairDoApp() }
                },
            ],
            { cancelable: false }
        );

    }
    const handlerSairDoApp = async () => {
        //limpar o asyncstorage
        let novoId = "";
        let novoName = "";
        let novoEmail = "";
        let novoToken = "";

        await AsyncStorage.setItem('token', novoToken);

        userDispatch({
            type: 'setAvatar',
            payload: {
                id: novoId,
                name: novoName,
                email: novoEmail,
            }
        })

        //deletar todas as fotos do cel
        const realm = await getRealm();
        const imagens = realm.objects('Imagens');

        //ir para a tela de login
        navigation.reset({
            routes: [{ name: 'SingIn' }]
        });
    }

    const apagarRealm = async () => {
        const realm2 = await getRealm();
        realm2.write(() => { realm2.deleteAll() });
    }

    const handleSincronizarClick = async () => {
        if (netInfo.isConnected) {
            if (await verificoSeTenhoAlgumaAlteracao() == true) {
                Alert.alert(
                    'Sincronizar',
                    'Você deseja sincronizar seus dados?',
                    [
                        {
                            text: 'Não',
                            //onPress: () => console.log('Não - salvar')
                        },
                        {
                            text: 'Sim',
                            onPress: () => handlerSincronizar()
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Sincronizar',
                    'Seus dados estão sincronizados!',
                    [
                        {
                            text: 'Fechar',
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false }
                );
                /*    Alert.alert(
                        'Sincronizar',
                        'Você deseja sincronizar seus dados?',
                        [
                          {
                            text: 'Não',
                            //onPress: () => console.log('Não - salvar')
                          },
                          {
                            text: 'Sim',
                            onPress: () => handlerSincronizar()
                            
                          },
                        ],
                        { cancelable: false }
                    );
                */
            }
        } else {
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
    const handlerSincronizar = async () => {
        await envioAsMinhasAlteracoes().then(() => {
            Alert.alert(
                'Sincronizar',
                'Seus dados estão sincronizados!',
                [
                    {
                        text: 'Ok',
                        style: 'cancel'
                    },
                ],
                { cancelable: false }
            );
        });

        /*await verificoSeTenhoNovasInspecoes().then(() => {
            Alert.alert(
                'Sincronizar',
                'Seus dados estão sincronizados!',
                [
                    {
                    text: 'Ok',
                    style: 'cancel'
                    },
                ],
                { cancelable: false }
            );
        });
        */
    }
    const verificoSeTenhoNovasInspecoes = async () => {
        let token = await AsyncStorage.getItem('token');
        const realm = await getRealm();
        let json = await Api.refresh(token);
        
        if (typeof(json) != "undefined" && json.lista_inspecoes > 0) {
            let inspecoes = json.lista_inspecoes;
            arrayTemp = [];
            arrayTempImg = [];

            inspecoes.forEach(obj => {
                let ins = realm.objects('Inspecoes').filtered('inspecao_id == "' + obj.inspecao_id + '"');
                if (ins.length == 1 &&
                    ins[0].inspecao_id == obj.inspecao_id &&
                    ins[0].empresa_nome == obj.empresa_nome &&
                    ins[0].rua == obj.rua &&
                    ins[0].numero == obj.numero &&
                    ins[0].bairro == obj.bairro &&
                    ins[0].cep == obj.cep &&
                    ins[0].cnpjcpf == obj.cnpjcpf &&
                    ins[0].telefone1 == obj.telefone1 &&
                    ins[0].telefone2 == obj.telefone2 &&
                    ins[0].email == obj.email &&
                    ins[0].data == obj.data &&
                    ins[0].tipo == obj.tipo
                ) {
                    arrayTemp.push(obj.inspecao_id);
                    console.log(arrayTemp);

                    //documentos
                    let listaDocumentos = json.lista_documentos; //API
                    //let docs = realm.objects('Documentos').filtered('inspecao_id = "'+obj.inspecao_id+'"'); //REALM
                    listaDocumentos.forEach(objLD => {
                        if (objLD.inspecao_id == obj.inspecao_id) {
                            let docLocalizado = realm.objects('Documentos').filtered('inspecao_id = "' + obj.inspecao_id + '" AND nome = "' + objLD.nome + '"'); //REALM
                            //verifico se as informacoes do documentos estão certas 
                            if (docLocalizado.length == 1 &&
                                docLocalizado[0].nome == objLD.nome &&
                                docLocalizado[0].caminho == objLD.caminho &&
                                docLocalizado[0].data_emissao == objLD.data_emissao //&&
                                //docLocalizado[0].data_validade == objLD.data_validade
                            ) {
                                //console.log("encontrei - doc");
                            } else if (docLocalizado.length == 0) {
                                saveDocumento(objLD)
                                //console.log("novo documento");
                            } else {
                                atualizarDocumento(obj.inspecao_id, obj.nome, objLD);
                            }
                        }
                    });

                    //imagens
                    let listaImagens = json.lista_imagens; //API
                    let imggs = realm.objects('Imagens');
                    console.log("API: ", listaImagens.length);
                    console.log("REALM: ", imggs.length);

                    listaImagens.forEach(objImg => {
                        if (objImg.inspecao_id == obj.inspecao_id) {
                            let imgLocalizado = realm.objects('Imagens').filtered('inspecao_id = "' + obj.inspecao_id + '" AND nome = "' + objImg.nome + '"'); //REALM
                            //console.log(imgLocalizado[0].inspecao_id, imgLocalizado[0].nome);
                            if (imgLocalizado.length == 1 &&
                                imgLocalizado[0].nome == objImg.nome &&
                                imgLocalizado[0].comentario == objImg.descricao &&
                                imgLocalizado[0].orientation == objImg.orientation
                            ) {
                                //console.log("Encontrei - imagem");
                                arrayTempImg.push(objImg.nome);
                            } else if (imgLocalizado.length == 0) {
                                //save imagem e comentario
                                //saveImagem(objImg)
                                //console.log("não encontrei");
                                arrayTempImg.push(objImg.nome);
                            } else {
                                //atualizar
                                //atualizarImagem(obj.inspecao_id, objImg.nome, objImg);
                                //console.log("tem uma imagem diferente");
                                arrayTempImg.push(objImg.nome);
                            }
                        }
                    })
                } else if (ins.length == 0) {
                    saveInspecao(obj);
                    arrayTemp.push(obj.inspecao_id);
                } else {
                    //atualizo os dados da inspecao
                    atualizarInspecao(obj);
                    arrayTemp.push(obj.inspecao_id);
                }
            });
            deletarInspecao(arrayTemp);
        }
    }
    /*
    *   FUNCAO: selecionar as imagens para deletar
    *   ENTRADA: lista de imagens da API
    *   SAIDA: gerar uma lista com imagens para deletar 
    */
    const selecionarImagensParaDeletar = async (value, token) => {
        const realm = await getRealm();
        let ins = realm.objects('Imagens'); //local
        let cont = 1;
        ins.forEach(item => {
            //let imgDelete = realm.objects('Imagens').filtered('nome = "'+item.nome+'"'); //REALM
            let sts = value.indexOf(item.nome) > -1;
            if (sts == false) {
                console.log("FALSE: ", item.nome);
                let imgDelete = realm.objects('Imagens').filtered('nome = "' + item.nome + '"'); //REALM
                console.log("FALSEEE: ", imgDelete);
                deletarImagemRealm(imgDelete);
            }
            console.log(cont, item.nome, sts);
            cont = cont + 1;
        })

    }
    /*
    *   FUNCAO: deletar uma imagem especifica no banco de dados do realm (local)
    *   ENTRADA: nome da imagem
    *   SAIDA:
    */
    const deletarImagemRealm = async (item) => {
        const realm = await getRealm();
        realm.write(() => {
            realm.delete(item)
        })
    }

    //deletar Inspecao
    const deletarInspecao = async (value) => {
        const realm = await getRealm();
        let ins = realm.objects('Inspecoes'); //local
        ins.forEach(item => {
            let sts = value.indexOf(item.inspecao_id) > -1;
            if (sts == false) {
                let inspDelete = realm.objects('Inspecoes').filtered('inspecao_id = "' + item.inspecao_id + '"'); //REALM
                let docDelete = realm.objects('Documentos').filtered('inspecao_id = "' + item.inspecao_id + '"'); //REALM
                let imgDelete = realm.objects('Imagens').filtered('inspecao_id = "' + item.inspecao_id + '"'); //REALM
                realm.write(() => {
                    realm.delete(inspDelete);
                });
                realm.write(() => {
                    realm.delete(docDelete);
                });
                realm.write(() => {
                    realm.delete(imgDelete);
                });
            }
        })
        //deletar inspecoa
        //deletar documentos
        //deletar imagens + comentarios
    }

    //atualizar
    const atualizarImagem = async (inspecao_id, nome, value) => {
        const realm = await getRealm();
        let imgAtualizar = realm.objects('Imagens').filtered('inspecao_id = "' + inspecao_id + '" AND nome = "' + nome + '"');
        //console.log(imgAtualizar.length, inspecao_id, nome);
        realm.write(() => {
            //inspecao[0].path = value.path;
            imgAtualizar[0].comentario = value.descricao;
            imgAtualizar[0].orientation = value.orientation;
        })

    }

    const atualizarDocumento = async (inspecao_id, nome, value) => {
        const realm = await getRealm();
        let inspecao = realm.objects('Documentos').filtered('inspecao_id = "' + inspecao_id + '" AND nome = "' + nome + '"');

        let data_validadeTemp = '';
        if (value.data_validade == null) {
            data_validadeTemp = 'null';
        }
        realm.write(() => {
            inspecao[0].nome = value.nome;
            inspecao[0].caminho = value.caminho;
            inspecao[0].data_emissao = value.data_emissao;
            inspecao[0].data_validade = data_validadeTemp;
        })
    }

    const atualizarInspecao = async (value) => {
        const realm = await getRealm();
        let inspecao = realm.objects('Inspecoes').filtered('inspecao_id == "' + value.inspecao_id + '"');
        realm.write(() => {
            inspecao[0].empresa_nome = value.empresa_nome;
            inspecao[0].rua = value.rua;
            inspecao[0].numero = value.numero;
            inspecao[0].bairro = value.bairro;
            inspecao[0].cep = value.cep;
            inspecao[0].cnpjcpf = value.cnpjcpf;
            inspecao[0].representante_legal = value.representante_legal;
            inspecao[0].telefone1 = value.telefone1;
            inspecao[0].telefone2 = value.telefone2;
            inspecao[0].email = value.email;
            inspecao[0].data = value.data;
            inspecao[0].tipo = value.tipo;
            inspecao[0].descricao = value.descricao;
        });
    }

    //salvar
    const saveImagem = async (value) => {
        const realm = await getRealm();
        realm.write(() => {
            realm.create('Imagens', {
                inspecao_id: value.inspecao_id,
                nome: value.nome,
                //path: value.path,
                status: "true",
                comentario: value.descricao,
                orientation: value.orientation,
            });
        });
    }

    const saveDocumento = async (value) => {
        let data_validadeTemp = '';
        if (value.data_validade == null) {
            data_validadeTemp = 'null';
        }
        const realm = await getRealm();
        realm.write(() => {
            realm.create('Documentos', {
                inspecao_id: value.inspecao_id,
                nome: value.nome,
                caminho: value.caminho,
                data_emissao: value.data_emissao,
                data_validade: data_validadeTemp,
            });
        });
    }

    const saveInspecao = async (value) => {
        let telefone2Temp = '';
        if (value.telefone2 == null) {
            telefone2Temp = 'null';
        }

        const realm = await getRealm();
        realm.write(() => {
            realm.create('Inspecoes', {
                inspecao_id: value.inspecao_id,
                empresa_nome: value.empresa_nome,
                rua: value.rua,
                numero: value.numero,
                bairro: value.bairro,
                cep: value.cep,
                cnpjcpf: value.cnpjcpf,
                representante_legal: value.representante_legal,
                telefone1: value.telefone1,
                telefone2: telefone2Temp,
                email: value.email,
                data: value.data,
                status: value.status,
                tipo: value.tipo,
                descricao: value.descricao,
            });
        });
    }

    const verificoSeTenhoAlgumaAlteracao = async () => {
        await verificoSeTenhoNovasInspecoes();
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('status == "false"');
        if (imagens.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const envioAsMinhasAlteracoes = async () => {
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('status == "false"');
        imagens.forEach(obj => {
            verificaBD(obj.inspecao_id, obj.nome, obj.comentario).then((value) => acaoSincronizarDados(value, obj));
            //verificaBD(obj.inspecao_id, obj.nome, obj.comentario).then((value) => console.log(value, obj.nome));
        });

    }

    /*const sincronizarDados = async() => {
        setLoading(true)
        const realm = await getRealm();
        let imagens = realm.objects('Imagens').filtered('status == "false"');
        setLoading(false);
        await AsyncStorage.setItem('sincronia', 'true');
    }
    */

    /*
    * FUNCAO: defino a ação que vai ser tomada apos a verificação 
    * ENTRADA: (boleano) value, (imagem) imagem, (string) comentario
    * SAIDA:
    */
    const acaoSincronizarDados = async (value, obj) => {
        //não enviou a imagem e nem o comentário
        if (value.comentario == false && value.imagem == false) {
            let formato = obj.path.split('.');
            let mime = "mime/" + formato[formato.length - 1];

            let teste = await Api.setImg(obj.inspecao_id, obj.path, obj.nome, obj.orientation, mime, obj.comentario, obj.status);
            console.log(obj.inspecao_id, obj.path, obj.nome, obj.orientation, mime, obj.comentario, obj.status);
            console.log("TESTE", teste);
            //altero o status da imagem para TRUE (já enviado)
            if (teste.status == true) {
                const realm = await getRealm();
                let imagens = realm.objects('Imagens').filtered('nome == "' + obj.nome + '"');
                realm.write(() => {
                    imagens[0].status = "true";
                })
            }


            //já enviou a imagem mas nao enviou o comentario ou quer atualizar o comentário   
        }
        /*else if(value.imagem == true){
            //console.log("OPA", value.comentario);
            let teste = await Api.setComentario(obj.inspecao_id, obj.nome, obj.comentario);
            if(teste.status == true){
                const realm = await getRealm();
                let imagens = realm.objects('Imagens').filtered('nome == "'+obj.nome+'"');
                realm.write(() => {
                    imagens[0].status = "true";
                })
            }
        }
        */
    }
    /*
    * FUNCAO: verifica pela API se uma imagem/comentario já foi enviado
    * ENTRADA: (int)inspecao_id, (string)nome, (string)comentario
    * SAIDA: (boolean)true ou false para imagem e comentário
    */
    const verificaBD = async (inspecao_id, nome, comentario) => {
        const req = await Api.verifica(inspecao_id, nome, comentario);
        console.log("FUNCAO VERIFICARBD", req);
        return req;
    }
    const atualizaStatus = async () => {
        if (await AsyncStorage.getItem('sincronia') == "true") {
            setSincroniaStatus("true");
        } else {
            setSincroniaStatus("false");
        }
    }
    useEffect(() => {
        //setInterval(()=> {
        atualizaStatus();
        //}, 3000)
    }, []);

    return (
        <Container>
            <Scroller>

                <HeaderArea>
                    <HeaderTitleBar>
                        <ApreentacaoIcon width="220" />
                    </HeaderTitleBar>

                </HeaderArea>

                <CustomButtonProgramacao onPress={handleProgramacaoClick}>
                    <CustomButtonText>Programação</CustomButtonText>
                    <ProgramacaoIcon width="50" />
                </CustomButtonProgramacao>

                <CustomButtonAtualizar onPress={handleSincronizarClick}>

                    <CustomButtonText>Sincronizar</CustomButtonText>

                    {loading == false
                        ? <AtualizarIcon width="50" />
                        : <LoadingIcon size="large" color="#fff" />
                    }
                </CustomButtonAtualizar>

                <CustomButtonExit onPress={handleLogoutClick}>
                    <CustomButtonText>Sair do aplicativo</CustomButtonText>
                    <SairIcon width="50" />
                </CustomButtonExit>

            </Scroller>
        </Container>
    );
}