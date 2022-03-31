import {StyleSheet,  View} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {firestore} from '../../firebase/config';
import {UserContext} from '../../contexts/userContext';
import RestaurantItem from '../../components/RestaurantItem';
import RestaurantSkeleton from '../../components/RestaurantSkeleton';


const Restaurants = ({navigation}) => {
  const [restaurants, setRestaurants] = useState([]);
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  
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
      <View style={styles.list}>
        {restaurants.map(item => (
         <RestaurantItem key={item.id} item={item} navigation={navigation}/>
        ))}
      </View>
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  list: {
     margin: 10
  },
});
