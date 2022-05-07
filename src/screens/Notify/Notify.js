import { ScrollView, StyleSheet, Text, View,  useWindowDimensions  } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { colors, shadowStyles } from '../../styleVariable'
import { TabView, SceneMap } from 'react-native-tab-view';
import NotifyToRestaurant from './NotifyToRestaurant'
import NotifySystem from './NotifySystem';


const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: NotifyToRestaurant,
  second: NotifySystem,
});

export default function Notify() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Cửa hàng' },
    { key: 'second', title: 'Hệ thống' },
  ]);

  return (
    <>
    <View style={styles.header}>

    <Text style={styles.headerTitle}>Thông báo</Text>
    </View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center'
  },
  headerTitle: {
     fontSize: 20,
     color: colors.text_color,
  },
})

