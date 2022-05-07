import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../styleVariable';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/userContext';

const CartItem = ({product, allPrice, setAllPrice, index}) => {
  const {cart, setCart} = useContext(UserContext)

  const [count, setCount] = useState(product.count)
  const [totalPrice, setTotalPrice] = useState(
    count * product.item.price
  );

  function handleCountUp(){
    setCount(count + 1)
    const order = cart.order
    order[index].count += 1
    const newOrder = [...order]
    setCart({...cart, order: newOrder})
    setAllPrice(parseInt(allPrice) + parseInt(product.item.price))
  }
  function handleCountDown(){
    if(count == 1) return
    setCount(count - 1)
    const order = cart.order
    order[index].count -= 1
    const newOrder = [...order]
    setCart({...cart, order: newOrder})
    setAllPrice(allPrice - product.item.price)
  }

  useEffect(() => {
    setTotalPrice(count * product.item.price)
  }, [count])

  return (
    <View style={styles.item}>
      <Image style={styles.img} source={{uri: product.item.img}} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{product.item.name}</Text>
        <View style={styles.itemPrice}>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
          <View style={styles.inputOrder}>
            <TouchableOpacity onPress={handleCountDown} style={[styles.orderItem, styles.btnOrder]}>
              <AntDesign color={'#fff'} size={20} name="minus" />
            </TouchableOpacity>
            <View style={[styles.orderItem]}>
              <Text style={styles.count}>{count}</Text>
            </View>
            <TouchableOpacity onPress={handleCountUp} style={[styles.orderItem, styles.btnOrder]}>
              <AntDesign color={'#fff'} size={20} name="plus" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  itemInfo: {
    justifyContent: 'space-around',
    marginLeft: 10,
    flex: 1,
  },
  itemPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  itemTitle: {
    fontSize: 20,
    color: colors.text_color,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    color: colors.prymary_color,
    fontWeight: '700',
  },
  inputOrder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  orderItem: {
    padding: 4,
    borderRadius: 30,
    alignItems: 'center',
  },
  btnOrder: {
    backgroundColor: colors.prymary_color,
  },
  count: {
    fontSize: 16,
    color: colors.text_color,
    fontWeight: '800',
  },
});
