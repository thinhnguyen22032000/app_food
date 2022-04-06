import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from '../styleVariable'
import { formatVnd } from '../firebase/calc'

const MenuItem = ({item, percent}) => {
  const calcPricePromotion = (1-(parseInt(percent)/100)) * item.price
  const priceFormat = formatVnd(calcPricePromotion)
  const oldPrice = formatVnd(parseInt(item.price))
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
       {percent? (<Text style={[styles.price, {textDecorationLine: 'line-through'}]}>{oldPrice}đ</Text>):null}
        <Text style={styles.price}>{priceFormat}đ</Text>
      </View>
      <Image style={styles.img} source={{uri: item.img}} />
    </View>
  )
}

export default MenuItem

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center'
        marginBottom: 20
    },
    name: {
      color: colors.text_color,
      fontSize: 20,
      marginBottom: 20
    },
    price: {
      color: colors.text_color
    },
    img: {
        width: 70,
        height: 70,
        marginLeft: 'auto',
        marginRight: 20
    }
})