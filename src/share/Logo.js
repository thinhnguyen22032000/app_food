import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../styleVariable'

const Logo = () => {
  return (
    <View style={{margin: 10}}>
      <Text style={{color: colors.prymary_color, fontWeight: 'bold', fontSize: 20}}>SPFOOD</Text>
      </View>
  )
}

export default Logo

const styles = StyleSheet.create({})