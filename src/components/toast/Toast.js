import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message';

const toast = (type, message) => {
  const typeMs = type?type:'success'
  const messageDf = message?message: 'Thành công 👋'
  return (
    Toast.show({
        type: typeMs,
        text1: messageDf,
      })
  )
}

export default toast

const styles = StyleSheet.create({})