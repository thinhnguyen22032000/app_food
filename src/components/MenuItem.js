import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState, memo } from 'react'
import { colors } from '../styleVariable'
import { formatVnd } from '../firebase/calc'
import ModalBase from './modal/ModalBase'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {UserContext} from '../contexts/userContext'
import { firestore } from '../firebase/config'


const MenuItem = ({item, percent, customerMode, navigation, idStore}) => {
  const {cart, setCart, userInfo} = useContext(UserContext)
  const [isModalVisible, setModalVisible] = useState(false);
  let [count, setCount] = useState(1)
  const [price, setPrice] = useState(item.price)

  let newPrice = percent && percent != 0?formatVnd((1-(parseInt(percent)/100)) * parseInt(item.price)):null
  let oldPrice = formatVnd(parseInt(item.price))

  console.log('cart', cart)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function handleCountUp(){
    setCount(count + 1)
  }
  function handleCountDown(){
    if(count == 1) return
    setCount(count - 1)
  }

  function handleOrder(){
     let currentCart = cart.order
     currentCart.push({
       idStore: idStore,
       item: item,
       count: count,
     }) 
     firestore().collection('users').doc(cart.id).update({order: currentCart})
     .then((data) => {
       alert('thanh công')
     })
     .catch(e => console.log(e))
    //  navigation.navigate('Cart')
  }

  useEffect(() => {
     setPrice(count * item.price)
  }, [count])

  return (
    <>
    <TouchableOpacity onPress={toggleModal} style={styles.item}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
       {percent? (<Text style={[styles.price, {textDecorationLine: newPrice?'line-through': 'none'}]}>{oldPrice}đ</Text>):
       <Text style={[styles.price]}>{item.price}đ</Text>}
       <Text style={styles.price}>{newPrice? `${newPrice}đ` : null}</Text>
      </View>
      <Image style={styles.img} source={{uri: item.img}} />
    </TouchableOpacity>
    {/* modal handle order */}
    <ModalBase btn_2 funcHandle={handleOrder} titleModal={item.name} hide isModalVisible={isModalVisible} toggleModal={toggleModal}>
    <Image style={styles.imgOrder} source={{uri: item.img}} />
    {percent? (<Text style={[styles.price, {textDecorationLine: newPrice?'line-through': 'none'}]}>{oldPrice}đ/1</Text>):
       <Text style={[styles.price]}>{item.price}đ/1</Text>}
       <Text style={styles.price}>{newPrice? `${newPrice}đ/1` : null}</Text>

       <View style={styles.inputOrder}>
         <View style={[styles.orderItem, styles.btnOrder]}><AntDesign onPress={handleCountDown} color={'#fff'} size={20} name='minus'/></View>
         <View style={[styles.orderItem]}><Text>{count}</Text></View>
         <View style={[styles.orderItem, styles.btnOrder]}><AntDesign onPress={handleCountUp} color={'#fff'} size={20} name='plus'/></View>
       </View>
       <View style={{marginTop: 10}}>
         <Text style={{color: colors.text_color}}>Thành tiền: {price}</Text>
       </View>
    </ModalBase>
    </>
  )
}

export default memo(MenuItem)

const styles = StyleSheet.create({
    item: {
        // flex: 1,
        flexDirection: 'row',
        // alignItems: 'center'
        padding: 10,
        backgroundColor: colors.white_color,
        width: '100%'
        
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
        backgroundColor: '#ddd'
    },
    imgOrder: {
      width: 200,
      height: 200
    },
    inputOrder: {
     
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    orderItem: {
      width: 40,
      padding: 2,
      
      alignItems: 'center'
    },
    btnOrder: {
     backgroundColor: colors.prymary_color,
    }


})