import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Historic from '../screens/Historic';
import Programacao from '../screens/Programacao';

const Stack = createStackNavigator();


export default () => (
    
    <Stack.Navigator
    initialRouteName="Preload"
    headerMode="screen"
    screenOptions={{
        headerTintColor:'#808080',
        headerStyle: { backgroundColor: '#fff'},
        headerShown: false //desabilitar menu principal
        }}
    >
        <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
                title: "Página inicial",
            }}
        />
        <Stack.Screen 
            name="Programacao" 
            component={Programacao}
            options={{
                title: "Programação",
                headerShown: true, //desabilitar menu principal
            }}
        />
        <Stack.Screen 
            name="Historic" 
            component={Historic}
            options={{
                title: "Histórico",
                headerShown: true, //desabilitar menu principal
            }}
            />
    </Stack.Navigator>
);