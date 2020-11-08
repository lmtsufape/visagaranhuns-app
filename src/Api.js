import AsyncStorage from '@react-native-community/async-storage';

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
        
    }
}
