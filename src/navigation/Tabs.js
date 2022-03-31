import React, {useState, useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManegerStack from './ManegerStack';
import AuthStack from './AuthStack';
import {UserContext} from '../contexts/userContext';
import {auth} from '../firebase/config';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../styleVariable';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [initializing, setInitializing] = useState(true);
  const {userInfo, setUserInfo, position} = useContext(UserContext);

  function onAuthStateChanged(user) {
    setUserInfo(user);
    console.log('user re-render: ' + userInfo);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const customTabBarStyle = {
    
    headerShown: false
}

  return userInfo && position ? (
    <Tab.Navigator
      activeColor="red"
      screenOptions={customTabBarStyle}>
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => <IconAntDesign  name="search1" size={30}  style={{color: focused?colors.prymary_color:'gray'}} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={ManegerStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <IconAntDesign name="setting" size={30}  style={{color: focused?colors.prymary_color:'gray'}} />
          ),
        }}
      />
    </Tab.Navigator>
  ) : (
    <AuthStack />
  );
}
