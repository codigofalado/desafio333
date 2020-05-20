import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Game from './screens/Game';
import Ranking from './screens/Ranking';
import Credits from './screens/Credits';

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Game" component={Game} />
        <Tab.Screen name="Ranking" component={Ranking} />
        <Tab.Screen name="Credits" component={Credits} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;
