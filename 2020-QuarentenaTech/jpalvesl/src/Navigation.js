import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import Game from './screens/Game';
import Ranking from './screens/Ranking';
import Credits from './screens/Credits';

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#860c4e',
          inactiveTintColor: '#0003',
          style: {
            backgroundColor: '#dedede',
            borderTopColor: '#D9C7EF'
          }
        }}
      >
        <Tab.Screen name="Game" component={Game} 
          options={{
            title: 'Jogo',
            tabBarIcon: ({ color, size }) => (<Ionicons name="logo-game-controller-a" color={color} size={size} />),
          }}
        />
        <Tab.Screen name="Ranking" component={Ranking} 
          options={{
            title: 'Ranking',
            tabBarIcon: ({ color, size }) => (<Ionicons name="ios-trophy" color={color} size={size} />),
          }}
        />
        <Tab.Screen name="Credits" component={Credits} 
          options={{
            title: 'Créditos',
            tabBarIcon: ({ color, size }) => (<Ionicons name="ios-person" color={color} size={size} />),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;
