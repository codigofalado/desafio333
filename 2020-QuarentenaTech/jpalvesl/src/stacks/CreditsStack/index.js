import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Credits from '../../screens/Credits';
import SocialScreen from '../../screens/SocialScreen';

const Stack = createStackNavigator();


function SocialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Credits" component={Credits} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Social" component={SocialScreen} 
        options={{
          title: 'João Lima',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#000',
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default SocialStack;