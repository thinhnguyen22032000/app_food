import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { container } from '../styleVariable';

const arr = [0,1,2,3,4, 5,6]

const RestaurantSkeleton = () => {
  return (
    <ScrollView style={container}>
     {
         arr.map(item => (
            <SkeletonPlaceholder key={item} >
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 180, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
         ))
     }
    </ScrollView>
  );
};

export default RestaurantSkeleton;

const styles = StyleSheet.create({
    skeletonItem: {
        marginBottom: 10
    }
});
