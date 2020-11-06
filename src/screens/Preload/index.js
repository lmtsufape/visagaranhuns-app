import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import { Text, View } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';

import LogoGus from '../../assets/logo_visaGus.svg';
import LoadingIconLMTS from '../../assets/logo_lmts.svg';


export default() => {

    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            //navigation.reset({
            //    routes:[{name:'SingIn'}],
            //});
            const token = await AsyncStorage.getItem('token')
            
            if(token !== ''){
                setTimeout(() => {
                    navigation.reset({
                        routes:[{name:'MainStackLogado'}]
                    });
                },2000)
            }else{
                navigation.reset({
                    routes:[{name:'SignIn'}]
                })
            }

            /*const token = await AsyncStorage.getItem('token');
            if(token !== null){
                //validar o token
                let res = await Api.checkToken(token);
                if(res.token){
                    await AsyncStorage.setItem('token', res.token);
                    userDispatch({
                        type:'setAvatar',
                        payload:{
                            id:json.table_data[0].id,
                            name:json.table_data[0].name,
                            email:json.table_data[0].email,
                        }
                    });
                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });
                }else{
                    navigation.reset({
                        routes:[{name:'SignIn'}]
                    })
                    //navigation.navigate('SignIn');
                }
                
            }else{
                //Sem token vai pra tela de login
                setTimeout(() => {
                    navigation.reset({
                        routes:[{name:'SingIn'}],
                    });
                })//,3000)
                //navigation.navigate('SingIn');

            }
            */
        }
        checkToken();
    },[]);
    return(
        <Container>
            <LogoGus width='100%' height='140'/>
            <LoadingIcon size='large' color='#808080'/>
            <Text style={{marginTop:40, marginBottom:10}}>Desenvolvido por:</Text>
            <LoadingIconLMTS width='100%' height='70'/>
        </Container>
        
    );
}