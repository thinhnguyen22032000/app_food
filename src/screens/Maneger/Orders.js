import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import {firestore} from '../../firebase/config'

const Orders = ({route}) => {
  const {item} = route.params;
  
  const [orders, setOrders] = useState([])
  
  function loadOrders(){
      firestore().collection('restaurants').doc(item.id).get()
      .then(data => setOrders(data._data.order))
      .catch(e => console.log(e))
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('restaurants')
      .doc(item.id)
      .onSnapshot(documentSnapshot => {
        loadOrders();
      });
    return () => subscriber();
  }, [])
  
  return (
    <View>
      <Text>Orders</Text>
      {
        orders.map((element, index) => (
          <View key={index}>
            <Text>Ngày đặt{element.dateOrder}</Text>
            {
              element.orderInfo.map((food, index) => (
                <Text key={index}>{food.item.name}</Text>
              ))
            }
          </View>
          
        ))
      }
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({})