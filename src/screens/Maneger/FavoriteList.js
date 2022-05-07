import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import ItemView from '../../components/ResFlatListItem'
import { firestore } from '../../firebase/config'

const FavoriteList = ({navigation}) => {
  const {restaurants, userInfo} = useContext(UserContext)
  const [data, setData] = useState([])
  const loadData = () => {
    if(!Array.isArray(restaurants)) return
    const dataFilter = restaurants.filter(res => res?.like?.uids.includes(userInfo.uid))
    setData(dataFilter)
  }
  useEffect(() => {
    const subscriber = firestore()
    .collection('restaurants')
    .onSnapshot(documentSnapshot => {
       loadData()
    });
  // Stop listening for updates when no longer required
  return () => subscriber();
  }, [])
  console.log(data)
  return (
    <View style={{margin: 10}}>
      <ScrollView>
          {
              data.map((item, index) => (
                  <ItemView item={item} key={index} navigation={navigation}/>
              ))
          }
      </ScrollView>
    </View>
  )
}

export default FavoriteList

const styles = StyleSheet.create({})