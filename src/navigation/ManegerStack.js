import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddRestaurant from '../screens/Maneger/AddRestaurant';
import Maneger from '../screens/Maneger/Maneger';
import Restaurants from '../screens/Maneger/Restaurants';
import RestaurantsPending from '../screens/Maneger/RestaurantsPending';
import { PRYMARY_COLOR } from '../styleVariable';
import RestaurantUpdate from '../screens/Maneger/RestaurantUpdate';
import OverView from '../screens/Maneger/OverView';
import Menu from '../screens/Maneger/Menu';
import Contact from '../screens/Maneger/Contact';
import AdminContact from '../screens/Maneger/AdminContact';
import FavoriteList from '../screens/Maneger/FavoriteList';
import RestaurantAll from '../screens/Maneger/RestaurantAll';
import Cart from '../screens/Maneger/Cart';
import Orders from '../screens/Maneger/Orders';
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
        options={{headerShown: false, headerTitleAlign: "center",}}></Stack.Screen>
      <Stack.Screen
        name="AddRestaurant"
        component={AddRestaurant}
        options={{title: 'Thêm cửa hàng', headerShadowVisible: false, headerTitleAlign: "center",}}></Stack.Screen>
      <Stack.Screen
        name="Restaurants"
        component={Restaurants}
        options={{title: 'Cửa hàng của tôi', headerTitleAlign: "center",}}></Stack.Screen>
      <Stack.Screen
        name="RestaurantsPending"
        component={RestaurantsPending}
        options={{title: 'Cửa hàng chờ', headerTitleAlign: "center",}}></Stack.Screen>
        <Stack.Screen
        name="OverView"
        component={OverView}
        options={{title: 'Chi tiết', headerTitleAlign: "center",}}></Stack.Screen>
        <Stack.Screen
        name="RestaurantUpdate"
        component={RestaurantUpdate}
        options={{title: 'Cập nhật', headerShadowVisible: false, headerTitleAlign: "center",}}></Stack.Screen>
        <Stack.Screen
        name="Menu"
        component={Menu}
        options={{title: 'Menu', headerTitleAlign: "center",}}></Stack.Screen>
         <Stack.Screen
        name="Contact"
        component={Contact}
        options={{title: 'Liên hệ với chúng tôi', headerTitleAlign: "center",}}></Stack.Screen>
          <Stack.Screen
        name="AdminContact"
        component={AdminContact}
        options={{title: 'Liên hệ', headerTitleAlign: "center",}}></Stack.Screen>
           <Stack.Screen
        name="FavoriteList"
        component={FavoriteList}
        options={{title: 'Danh sách yêu thích', headerTitleAlign: "center",}}></Stack.Screen>
           <Stack.Screen
        name="RestaurantAll"
        component={RestaurantAll}
        options={{title: 'Tất cả cửa hàng', headerTitleAlign: "center",}}></Stack.Screen>
            <Stack.Screen
        name="Cart"
        component={Cart}
        options={{title: 'Giỏ hàng', headerTitleAlign: "center",}}></Stack.Screen>
           <Stack.Screen
        name="Orders"
        component={Orders}
        options={{title: 'Đơn hàng', headerTitleAlign: "center",}}></Stack.Screen>
    </Stack.Navigator>
  );
}
