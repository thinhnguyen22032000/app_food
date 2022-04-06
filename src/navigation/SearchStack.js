import Search from '../screens/Search/Search';

import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../screens/Detail';
import {colors} from '../styleVariable';
import HashTag from '../screens/HashTag';
import SearchMain from '../screens/Search/SearchMain';
import Landing from '../screens/Search/Landing';
import Category from '../screens/Search/Category';
import CommentView from '../screens/Search/CommentView';
const Stack = createNativeStackNavigator();

export default function SearchStack({navigation}) {

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: colors.white_color,
        }}></Stack.Screen>
      <Stack.Screen
        name="HashTag"
        component={HashTag}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="SearchMain"
        component={SearchMain}
        options={{
          headerTitle: 'Tìm kiếm',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}></Stack.Screen>
        <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
        }}></Stack.Screen>
         <Stack.Screen
        name="Comment"
        component={CommentView}
        options={{
          headerTitle: 'Đánh giá và nhận xét',
          headerBackTitleVisible: false,
          headerTransparent: true,
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}
