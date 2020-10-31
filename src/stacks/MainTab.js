import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Historic from '../screens/Historic';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Historic" component={Historic} />
    </Tab.Navigator>
);