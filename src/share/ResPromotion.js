import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/userContext'
import ItemView from '../components/ResFlatListItem'

const ResPromotion = ({navigation}) => {
  const [data, setData] = useState([])
  const {restaurants} = useContext(UserContext)

  useEffect(() => {
     const data = restaurants.filter(item => {
         return item.promotion && item.promotion != 0? item : null
     })
     setData(data)
  }, [restaurants])
  console.log('khuyen mai',data)
  return (
    <ScrollView horizontal={true} style={styles.container}>
     {
         data.map(item => (
             <ItemView navigation={navigation} vertical key={item.id} item={item}/>
         ))
     }
    </ScrollView>
  )
}

export default ResPromotion

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  }
})