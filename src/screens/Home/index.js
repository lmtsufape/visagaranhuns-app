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
        const realm = await getRealm();
        realm.write(() => { realm.deleteAll() });
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

    const verificarDocumento = async (listaDocumento, inspecao) => {
        const realm = await getRealm();

        listaDocumento.forEach(documento => {
            let docLocalizado = realm.objects('Documentos')
                .filtered('inspecao_id = "' + inspecao.inspecao_id + '" AND nome = "' + documento.nome + '"');

            if (inspecao.inspecao_id == documento.inspecao_id) {
                if (docLocalizado.length == 1) {

                    if (docLocalizado[0].nome != documento.nome ||
                        docLocalizado[0].caminho != documento.caminho ||
                        docLocalizado[0].data_emissao != documento.data_emissao
                    ) {
                        atualizarDocumento(inspecao, documento);
                        return;
                    }
                } else if (docLocalizado.length == 0) {
                    saveDocumento(documento)
                    return;
                }
            }
        });
    }

    const verificarImagem = async (listaImagem, inspecao) => {
        const realm = await getRealm();

        listaImagem.forEach(imagem => {
            let imgLocalizado = realm.objects('Imagens').filtered('inspecao_id = "' + inspecao.inspecao_id + '" AND nome = "' + imagem.nome + '"');

            if (inspecao.inspecao_id == imagem.inspecao_id) {
                if (imgLocalizado.length == 1) {

                    if (imgLocalizado[0].nome != imagem.nome ||
                        imgLocalizado[0].comentario != imagem.descricao ||
                        imgLocalizado[0].orientation != imagem.orientation
                    ) {
                        atualizarImagem(inspecao.inspecao_id, inspecao.nome, imagem);
                        return
                    }
                } else if (imgLocalizado.length == 0) {
                    saveImagem(imagem);
                    return
                }
            }
        });
    }

    const verificoSeTenhoNovasInspecoes = async () => {
        let token = await AsyncStorage.getItem('token');
        const realm = await getRealm();
        let json = await Api.refresh(token);


        if (typeof (json) != "undefined" && json.lista_inspecoes.length > 0) {
            let inspecoes = json.lista_inspecoes;
            let listaDocumentos = json.lista_documentos;
            let listaImagens = json.lista_imagens;

            inspecoes.forEach(obj => {

                let ins = realm.objects('Inspecoes').filtered('inspecao_id == "' + obj.inspecao_id + '"');

                if (ins.length == 1) {
                    if (ins[0].inspecao_id != obj.inspecao_id ||
                        ins[0].empresa_nome != obj.empresa_nome ||
                        ins[0].rua != obj.rua ||
                        ins[0].numero != obj.numero ||
                        ins[0].bairro != obj.bairro ||
                        ins[0].cep != obj.cep ||
                        ins[0].cnpjcpf != obj.cnpjcpf ||
                        ins[0].telefone1 != obj.telefone1 ||
                        ins[0].telefone2 != obj.telefone2 ||
                        ins[0].email != obj.email ||
                        ins[0].data != obj.data ||
                        ins[0].tipo != obj.tipo) {
                        atualizarInspecao(obj);
                    }
                } else if (ins.length == 0) {
                    saveInspecao(obj);
                }

                verificarDocumento(listaDocumentos, obj);
                verificarImagem(listaImagens, obj);
            });
        } else {
            apagarRealm();
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

    const atualizarImagem = async (inspecao_id, nome, value) => {
        const realm = await getRealm();
        let imgAtualizar = realm.objects('Imagens').filtered('inspecao_id = "' + inspecao_id + '" AND nome = "' + nome + '"');

        realm.write(() => {
            imgAtualizar[0].comentario = value.descricao;
            imgAtualizar[0].orientation = value.orientation;
        })

    }

    const atualizarDocumento = async (inspecao, value) => {
        const realm = await getRealm();
        let documento = realm.objects('Documentos').filtered('inspecao_id = "' + inspecao.inspecao_id + '" AND nome = "' + inspecao.nome + '"');

        let data_validadeTemp = '';
        if (value.data_validade == null) {
            data_validadeTemp = 'null';
        }
        realm.write(() => {
            documento[0].caminho = value.caminho;
            documento[0].data_emissao = value.data_emissao;
            documento[0].data_validade = data_validadeTemp;
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
                path: value.path,
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