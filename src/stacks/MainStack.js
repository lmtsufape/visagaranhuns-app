import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Button} from 'react-native';

import Preload from '../screens/Preload';
import SingUp from '../screens/SingUp';
import SingIn from '../screens/SingIn';
import MainStackLogado from './MainStackLogado';

const Stack = createStackNavigator();


export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload}/>
        <Stack.Screen name="SingUp" component={SingUp}/>
        <Stack.Screen name="SingIn" component={SingIn}/>
        <Stack.Screen name="MainStackLogado" component={MainStackLogado}/>
    </Stack.Navigator>

);