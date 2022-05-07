import { ScrollView, StyleSheet, Text, View,  useWindowDimensions  } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../contexts/userContext'
import { firestore } from '../../firebase/config'
import { colors, shadowStyles } from '../../styleVariable'


const NotifySystem = () => {
  const {userInfo, restaurantError} = useContext(UserContext)
  const [msg, setMsg] = useState([])

  useEffect(() => {
    const newMsg = []
    const dataFilter = restaurantError.filter(item => item.user.id === userInfo.uid)
    dataFilter.forEach(element => {
        newMsg.push(`${element?.name || 'storeErr'} có vấn đề về tọa độ, quí khách vui lòng kiểm tra lại.`)
    });
    setMsg(newMsg)
  }, [])
  
  return (
    <View>
      <Text>NotifySystem</Text>
      {
           msg.map((element, index) => (
               <Text key={index}>{element}</Text>
           ))
      }
    </View>
  )
}

export default NotifySystem

const styles = StyleSheet.create({})