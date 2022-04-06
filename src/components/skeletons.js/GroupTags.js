import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {  container } from '../../styleVariable';

const arr = [0,1,2,3,4, 5,6]

const GroupTags = () => {
  return (
    <ScrollView style={[container, {flex: 1}]}>
      <SkeletonPlaceholder>
          <View style={{height: 80, marginBottom: 10 }}></View>
      </SkeletonPlaceholder>
    {
        arr.map(item => (
           <SkeletonPlaceholder key={item} >
           <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
             <View>
               <View style={{width: 180, height: 20, borderRadius: 4}} />
               <View
                 style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
               />
             </View>
             <View style={{marginLeft: 'auto',width: 80, height: 80, borderRadius: 10}} />
           </View>
         </SkeletonPlaceholder>
        ))
    }
   </ScrollView>
  )
}

export default GroupTags

const styles = StyleSheet.create({
  
})