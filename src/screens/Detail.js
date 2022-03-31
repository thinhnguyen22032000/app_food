import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import RestaurantDetail from './Maneger/RestaurantDetail';
import Comments from '../components/Comments';
import {container} from '../styleVariable';

const Detail = ({navigation, route}) => {
  return (
    // <ScrollView>
    //   <View>
    //     <RestaurantDetail route={route} navigation={navigation} />
    //   </View>
    //   <View>
    //     <Comments route={route} />
    //   </View>
    // </ScrollView>
    <RestaurantDetail route={route} navigation={navigation} />
  );
};

export default Detail;

const styles = StyleSheet.create({});
