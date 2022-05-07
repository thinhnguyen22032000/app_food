import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {firestore} from '../../firebase/config';
import {UserContext} from '../../contexts/userContext';
import RestaurantItem from '../../components/RestaurantItem';
import RestaurantSkeleton from '../../components/RestaurantSkeleton';
import Empty from '../../components/Empty';
import Search from '../../components/comstomComponent/Search';

const Restaurants = ({navigation}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [data, setData] = useState([])
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
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
        let listFilter = newRes.filter(item => {
          if (item.user) {
            if (item.user.id == userInfo.uid) {
              return item;
            }
          }
        });
        setRestaurants(listFilter);
        setData(listFilter);
        setFlag(true);
      });
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection('restaurants')
      .onSnapshot(documentSnapshot => {
        console.log('Res data: ', documentSnapshot.docs);
        loadData();
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) return <RestaurantSkeleton />;
  return (
    <View style={styles.container}>
      <View>
      <Search placeholder={'Tên cửa hàng'} data={restaurants} setData={setData}/>
      </View>
      {restaurants && restaurants.length > 0 ? (
        <ScrollView style={styles.list}>
          {data.map(item => (
            <RestaurantItem key={item.id} item={item} navigation={navigation} />
          ))}
        </ScrollView>
      ) : (
        flag && <Empty message={'Bạn không có cửa hàng nào'} />
      )}
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
});
