import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Button, Linking, StyleSheet, View } from "react-native";


const BASE_API = 'http://192.168.0.106'; //garanhuns
//const BASE_API = 'http://192.168.15.10'; //recife

export default {
    //verificar "token"
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/api/refresh?json=true`,
        {
            method:'POST',
            headers:{
                Acenpt: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    //login - entrar
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/api/login?json=true`,
        {
            method:'POST',
            headers:{
                Acenpt: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });
        const json = await req.json();
        return json;
    },
    getInspecoes: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/api/download/inspecoes?json=true`,
        {
            method:'POST',
            headers:{
                Acenpt: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
        
    },
    //funcao para enviar uma imagem
    setImg: async (image,inspecao_id) => {
        //console.log(image.exif["Orientation"]);
        let body = new FormData();
        body.append('photo', {uri: image.path, name: 'photo.png',filename :'imageName.jpeg',type: image.mime});
        body.append('Content-Type', 'image/jpeg');
        body.append('id', inspecao_id);
        body.append('orientation', image.exif["Orientation"]);

        fetch(`${BASE_API}/api/save/img?json=true`,{ method: 'POST',headers:{  
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
            } , body :body} )
         .then((res) => checkStatus(res))
         .then((res) => res.json())
         .then((res) => { console.log("response" +JSON.stringify(res)); })
         .catch((e) => console.log(e))
         .done()

    },
    /*
    * FUNCAO: funcao para capturar as imagens já enviadas para o sistema
    * ENTRADA: inspecao_id
    * SAIDA: lista de imagens
    */
    getImg: async (inspecao_id) => {
    const req = await fetch(`${BASE_API}/api/donwload/img?json=true`,
    {
        method:'POST',
        headers:{
            Acenpt: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({inspecao_id})
    });
    
    const json = await req.json();
    return json;
   },
   /*
    * FUNCAO: funcao para capturar os documentos por cnae
    * ENTRADA: inspecao_id
    * SAIDA: lista de imagens
    */
    getDoc: async (caminho) => {
        Linking.canOpenURL(`${BASE_API}/api/donwload/img/pdf?caminho=`+caminho).then(supported => {
          if (supported) {
            Linking.openURL(`${BASE_API}/api/donwload/img/pdf?caminho=`+caminho);
          } else {
            console.log("Deu erro no link, tente novamente!");
          }
        });
        /*const req = await fetch(`${BASE_API}/api/donwload/img/pdf?json=true`,
        {
            method:'GET',
            headers:{
                Acenpt: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({caminho})
        });
        
        const json = await req.json();
        return json;
        */
    }

}
