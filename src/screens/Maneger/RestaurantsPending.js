import {StyleSheet, Text, View, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firestore} from '../../firebase/config';
import {addData, deleteData} from '../../firebase/helpers';
import ButtonCustom from '../../components/Button';
import Loading from '../../components/Loading';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import RestaurantSkeleton from '../../components/RestaurantSkeleton';

const RestaurantsPending = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(true)

  const getRestaurants = () => {
    console.log('lay lai du lieu');
    firestore()
      .collection('storePending')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let newRes = [];
        querySnapshot.forEach(documentSnapshot => {
          newRes.push({...documentSnapshot.data(), id: documentSnapshot.id});
        });
        setRestaurants(newRes);
        setLoadData(false)
        console.log(restaurants);
      });
  };

  useEffect(() => {
    getRestaurants();
  }, []);
  //   handle admin process stores
  const handleProcessRes = item => {
    setLoading(true);
    const pm1 = addData('restaurants', item);
    const pm2 = deleteData('storePending', item.id);
    Promise.all([pm1, pm2]).then(() => {
      getRestaurants();
      setLoading(false);
      Alert.alert('Xu ly thanh cong');
    });
  };
  const handleDeleteRes = item => {
    setLoading(true);
    deleteData('storePending', item.id, item.img).then(() => {
      getRestaurants();
      setLoading(false);
      Alert.alert('Xoa thanh cong');
    });
  };
  console.log(restaurants);

  if (loading) return <Loading />;

  if(loadData) return (<RestaurantSkeleton/>)

  return restaurants === [] ? (
    <View style={styles.container}>
      <Image source={require('../../assets/empty.png')} />
    </View>
  ) : (
    <View>
      <View style={styles.list}>
        {restaurants.map(item => (
          <View style={styles.item} key={item.id}>
            <Image style={styles.img} source={{uri: item.img}} />
            <Text>{item.name}</Text>
            <View style={styles.btnRight}>
              <TouchableOpacity onPress={() => handleDeleteRes(item)} style={styles.btnItem}>
                <IconAntDesign name="delete" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleProcessRes(item)}  style={styles.arrow}>
                <IconAntDesign name="checkcircleo" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RestaurantsPending;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  list: {
    margin: 20,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    borderBottomColor: '#dbd9d5',
    borderBottomWidth: 2,
    marginBottom: 30,
    marginBottom: 2
  },
  btnRight: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  btnItem: {
    marginRight: 20,
    
  }
});
