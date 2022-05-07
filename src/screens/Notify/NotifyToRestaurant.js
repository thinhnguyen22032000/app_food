import { ScrollView, StyleSheet, Text, View,  useWindowDimensions  } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../contexts/userContext'
import { firestore } from '../../firebase/config'
import { colors, shadowStyles } from '../../styleVariable'


const NotifyToRestaurant = () => {
  const {userInfo, restaurantError} = useContext(UserContext)
  const [notifies, setNotifies] = useState([])
  const dfDate = '2000-4-20 17:12:35'

  const loadData = () => {
    firestore().collection('notifies').get()
    .then(data => {
       const array = []
       data.forEach(doc => {
       array.push(doc.data())
       })
       const dataFilter = array.filter(item => {
         const isIn = item?.uids?.includes(userInfo.uid)
         if(isIn) return item
       })
       const newData = []
       dataFilter.forEach(item => {
         item?.notify.forEach(notify => {
            newData.push(notify)
         })
       })
       const sordByDate = newData.sort((a, b) => Date.parse(a?.date_notify || dfDate) - Date.parse(b?.date_notify || dfDate))
       console.log(sordByDate)
       setNotifies(sordByDate) 
       
   })
   .catch(err => console.log('Lỗi notify : ',err))
  }
  useEffect(() => {
    const subscriber = firestore()
      .collection('notifies')
      .onSnapshot(documentSnapshot => {
         loadData()
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
      

  }, [])
  console.log(restaurantError)
 
  return (
    <ScrollView style={{margin: 10, flex:1}}>
      <View style={styles.header}>
      <View style={{padding: 10, backgroundColor: '#'}}>
        <Text>Mô tả: Thông báo được gửi đến từ những cửa hàng bạn thích</Text>
      </View>
      <View>
          <View>
              { 
                notifies.map((item, index) => (
                  <View style={[styles.item, shadowStyles.shadow]} key={index}>
                    <Text style={styles.time}>{item?.date_notify || '--/--/----'}</Text>
                    <Text style={styles.notify}>{item?.text || item}</Text>
                  </View>
                ))
              }
          </View>
      </View>
      </View>
    </ScrollView>
  )
}

export default NotifyToRestaurant

const styles = StyleSheet.create({
  header: {
    alignItems: 'center'
  },
  headerTitle: {
     fontSize: 20,
     color: colors.text_color,
  },
  item: {
     backgroundColor: '#eee',
     padding: 10,
     marginBottom: 1

  },
  time: {
    // backgroundColor: colors.prymary_bg,
    padding: 4,
    // color: colors.white_color,
    width: 'auto'
  },
  notify: {
    color: colors.text_color
  }

})