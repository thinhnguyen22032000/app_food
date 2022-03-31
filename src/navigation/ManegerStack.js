import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddRestaurant from '../screens/Maneger/AddRestaurant';
import Maneger from '../screens/Maneger/Maneger';
import Restaurants from '../screens/Maneger/Restaurants';
import RestaurantsPending from '../screens/Maneger/RestaurantsPending';
import { PRYMARY_COLOR } from '../styleVariable';
import RestaurantDetail from '../screens/Maneger/RestaurantDetail';
import RestaurantUpdate from '../screens/Maneger/RestaurantUpdate';
import OverView from '../screens/Maneger/OverView';
const Stack = createNativeStackNavigator();

export default function ManegerStack() {
  return (
    <Stack.Navigator
   
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        
        headerTintColor: PRYMARY_COLOR,
        headerTitleStyle: {
          fontWeight: "normal",
          fontSize: 18,
        },
      }}>
      <Stack.Screen
        name="Maneger"
        component={Maneger}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="AddRestaurant"
        component={AddRestaurant}
        options={{title: 'Thêm cửa hàng'}}></Stack.Screen>
      <Stack.Screen
        name="Restaurants"
        component={Restaurants}
        options={{title: 'Cửa hàng của tôi'}}></Stack.Screen>
      <Stack.Screen
        name="RestaurantsPending"
        component={RestaurantsPending}
        options={{title: 'Cửa hàng chờ'}}></Stack.Screen>
        <Stack.Screen
        name="OverView"
        component={OverView}
        options={{title: 'Chi tiết'}}></Stack.Screen>
        <Stack.Screen
        name="RestaurantUpdate"
        component={RestaurantUpdate}
        options={{title: 'Cập nhật'}}></Stack.Screen>
    </Stack.Navigator>
  );
}
