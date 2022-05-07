
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notify from '../screens/Notify/Notify';
const Stack = createNativeStackNavigator();

export default function SearchStack({navigation}) {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notify"
        component={Notify}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
}
