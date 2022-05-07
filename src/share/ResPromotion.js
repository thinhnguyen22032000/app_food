import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/userContext'
import ItemView from '../components/ResFlatListItem'

const ResPromotion = ({navigation}) => {
  const [data, setData] = useState([])
  const {restaurants} = useContext(UserContext)

  useEffect(() => {
     const data = restaurants.filter(item => {
         return    item?.show !== false 
                && item.promotion && item.promotion != '0' 
                && item.promotion.promotion != "0"
                ?  item : null
     })
     setData(data)
  }, [restaurants])
  console.log('khuyen mai',data)
  return (
    <ScrollView horizontal={true} style={styles.container}>
     {
         data.length === 0?(
            <Text style={{padding: 10}}>Hiện không có khuyến mãi</Text>
         ):(
           data.map(item => (
               <ItemView navigation={navigation} vertical key={item.id} item={item}/>
           ))
         )
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