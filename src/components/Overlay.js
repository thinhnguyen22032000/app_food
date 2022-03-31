import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements';

const OverlayCustom = ({loading}) => {
  return (
    <Overlay isVisible={loading}>
        <Text>Đang xử lý...</Text>
    </Overlay>
  )
}

export default OverlayCustom

const styles = StyleSheet.create({})