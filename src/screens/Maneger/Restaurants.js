import {StyleSheet,  View, ScrollView} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {firestore} from '../../firebase/config';
import {UserContext} from '../../contexts/userContext';
import RestaurantItem from '../../components/RestaurantItem';
import RestaurantSkeleton from '../../components/RestaurantSkeleton';
import { colors } from '../../styleVariable';
import Empty from '../../components/Empty';


const Restaurants = ({navigation}) => {
  const [restaurants, setRestaurants] = useState([]);
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  const [flag, setFlag] = useState(false);
  
  const loadData = () => {
    firestore()
    .collection('restaurants')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
      let newRes = [];
      querySnapshot.forEach(documentSnapshot => {
        newRes.push({...documentSnapshot.data(), id: documentSnapshot.id});
      });
      let listFilter = newRes.filter((item) => {
        if(item.user) {
          if(item.user.id == userInfo.uid){
            return item
          }
        }
      })
      setRestaurants(listFilter);
      setFlag(true)
    });
  }
  useEffect(() => {
    const subscriber = firestore()
    .collection('restaurants')
    .onSnapshot(documentSnapshot => {
      console.log('Res data: ', documentSnapshot.docs);
      loadData()
      setLoading(false)
    })  
    return () => subscriber() 
  },[]);
  
  if(loading) return (<RestaurantSkeleton/>)
  return (
    <View style={styles.container}>
      {

        restaurants && restaurants.length > 0? (
          <ScrollView style={styles.list}>
          {restaurants.map(item => (
           <RestaurantItem key={item.id} item={item} navigation={navigation}/>
          ))}
        </ScrollView>
        ):(
          flag  && <Empty message={'Bạn không có cửa hàng nào'} />
        )
      }
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    //  backgroundColor: colors.white_color,
     flex: 1,
     
  },
  list: {
     margin: 20
  },
});
