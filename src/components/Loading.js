import { View, Text, ActivityIndicator , StyleSheet} from 'react-native'
import React from 'react'
import { PRYMARY_COLOR } from '../styleVariable';
import { FAB } from 'react-native-elements';
import { colors } from '../styleVariable';

export default function Loading() {
  return (
    <View style={[styles.container, styles.horizontal]}>
     <ActivityIndicator size="small" color={colors.prymary_color} />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      
    },
    horizontal: {
      flexDirection: "row",
      padding: 10
    }
  });
  