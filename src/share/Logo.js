import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../styleVariable'
import { NAME_APP } from '../adminConfig'

const Logo = () => {
  return (
    <View style={{margin: 10}}>
      <Text style={{color: colors.prymary_color, fontWeight: 'bold', fontSize: 20,}}>{NAME_APP.toUpperCase()}</Text>
      </View>
  )
}

export default Logo

const styles = StyleSheet.create({})