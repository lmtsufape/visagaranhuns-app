import AsyncStorage from '@react-native-community/async-storage';
import { Linking } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';


//const BASE_API = 'http://192.168.0.106'; //garanhuns
// const BASE_API = 'http://sistemas.ufape.edu.br/visagaranhuns'; //garanhuns
//const BASE_API = 'http://192.168.15.10'; //recife

export default {
    //verificar "token"
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/api/refresh?json=true`,
            {
                method: 'POST',
                headers: {
                    Acenpt: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
        const json = await req.json();
        return json;
    },

    //login - entrar
    signIn: async (email, password) => {
        try {
            const req = await fetch(`${BASE_API}/api/login?json=true`,
                {
                    method: 'POST',
                    headers: {
                        Acenpt: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
            const json = await req.json();
            return json;
        } catch (error) {
            //console.error("OPAAA",error);
        }
        return 0;
    },

    getInspecoes: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/api/download/inspecoes?json=true`,
            {
                method: 'POST',
                headers: {
                    Acenpt: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
        const json = await req.json();
        return json;

    },
    //funcao para enviar uma imagem
    //obj.inspecao_id, obj.path,mime, obj.comentario, obj.status
    setImg: async (inspecao_id, path, nome, orientation, mime, comentario, status) => {
        //console.log(image.exif["Orientation"]);
        let body = new FormData();
        body.append('photo', { uri: path, name: 'photo.png', filename: 'imageName.jpeg', type: mime });
        body.append('Content-Type', 'image/jpeg');
        body.append('id', inspecao_id);
        body.append('orientation', orientation);
        body.append('comentario', comentario);
        body.append('status', status);
        body.append('nome', nome);


        const req = await fetch(`${BASE_API}/api/save/img?json=true`, {
            method: 'POST', headers: {
                "Content-Type": "multipart/form-data",
                "otherHeader": "foo",
            }, body: body
        })
        const json = await req.json();
        return json;
    },
    /*
    * FUNCAO: funcao para salvar o comentário na imagem
    * ENTRADA: inspecao_id,nome,comentario
    * SAIDA: (String) true ou false
    */
    setComentario: async (inspecao_id, nome, comentario) => {
        let body = new FormData();
        body.append('id', inspecao_id);
        body.append('comentario', comentario);
        body.append('nome', nome);
        const req = await fetch(`${BASE_API}/api/save/comentario?json=true`, {
            method: 'POST', headers: {
                "Content-Type": "multipart/form-data",
                "otherHeader": "foo",
            }, body: body
        })
        const json = await req.json();
        return json;
    },
    /*
    * FUNCAO: funcao para verificar se a imagem já foi enviada
    * ENTRADA: inspecao_id, nome
    * SAIDA: (String) true ou false
    */
    verifica: async (inspecao_id, nome, comentario) => {
        const req = await fetch(`${BASE_API}/api/verifica/img?json=true`,
            {
                method: 'POST',
                headers: {
                    Acenpt: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inspecao_id, nome, comentario })
            });
        const json = await req.json();
        return json;
    },

    /*
    * FUNCAO: funcao para capturar as imagens já enviadas para o sistema
    * ENTRADA: inspecao_id
    * SAIDA: lista de imagens
    */
    getImg: async (inspecao_id) => {
        const req = await fetch(`${BASE_API}/api/donwload/img?json=true`,
            {
                method: 'POST',
                headers: {
                    Acenpt: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inspecao_id })
            });

        const json = await req.json();
        return json;
    },

    getImgURL: async (url, nome) => {
        let dirs = RNFetchBlob.fs.dirs;
        let local = 'file:///storage/emulated/0/Android/data/com.appvisa/files/Pictures/'


        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'jpeg',
            path: dirs.DocumentDir + "/" + url,
        })
            .fetch('GET', `${BASE_API}/imagens/inspecoes/` + url)
            .then(res => {
                CameraRoll.save(res.data, 'photo').then(onfulfilled => {
                });
            })
            .catch(error => console.log(error));
        return "file://" + dirs.DocumentDir + "/" + url;
    },
    /*
     * FUNCAO: funcao para capturar os documentos por cnae
     * ENTRADA: inspecao_id
     * SAIDA: lista de imagens
     */
    getDoc: async (caminho) => {
        Linking.canOpenURL(`${BASE_API}/api/donwload/img/pdf?caminho=` + caminho).then(supported => {
            if (supported) {
                Linking.openURL(`${BASE_API}/api/donwload/img/pdf?caminho=` + caminho);
            } else {
                console.log("Deu erro no link, tente novamente!");
            }
        });
    },
    /*
    *   FUNCAO: função que baixa as inspecoes, documentos e imagens
    *   ENTRADA: token
    *   SAIDA: (lista) inspecoes, documentos e imagens
    */
    refresh: async (token) => {
        let caminho = BASE_API + "/api/atualizar/aplicativo?token=" + token;
        try {
            let resposta = await fetch(caminho,
                {
                    method: 'POST',
                    headers: {
                        Acenpt: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify({token})
                });
            let json = await resposta.json();
            return json;
        } catch (error) {
            //console.error("ERROR: ",error);
        }
    }

}
