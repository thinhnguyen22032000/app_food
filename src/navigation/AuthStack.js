import Login from '../screens/Login'
import Register from '../screens/Register'

import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../screens/Search/Landing';
import { colors } from '../styleVariable';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="login" component={Login}></Stack.Screen>
    <Stack.Screen
    options={{
      headerTitle: '',
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      headerTransparent: true,
      headerTintColor: colors.prymary_color,
    }} 
    name="register" component={Register}></Stack.Screen>
    <Stack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false, tabBarStyle: { display: 'none' }}}></Stack.Screen>
  </Stack.Navigator>
  )
}