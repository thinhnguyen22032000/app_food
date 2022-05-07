import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputCustom from '../../../Input'
import CurrentImagePicker from '../../../CurrentImagePicker'

const Item = ({setName, setPrice, setImg, img, err}) => {
  return (
    <View>
         <InputCustom label={'Tên món'} required width={'90%'} errorMessage={err} onChangeText={setName} placeholder={'Tên món ăn...'} />
         <InputCustom label={'Giá'} required width={'90%'} errorMessage={err} onChangeText={setPrice} placeholder={'Giá...'} />
         <CurrentImagePicker required error={err} img={img} setImg={setImg} />
    </View>
  )
}

export default Item

const styles = StyleSheet.create({})