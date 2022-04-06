import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'

const DividerCustom = ({text}) => {
  return (
    <Divider 
     orientation="horizontal"
     subHeader="Menu"
     subHeaderStyle={
         { alignSelf: 'center' ,
           color: "#000",
           fontSize: 20,
           margin: 10
         }}
     />
  )
}

export default DividerCustom

const styles = StyleSheet.create({})