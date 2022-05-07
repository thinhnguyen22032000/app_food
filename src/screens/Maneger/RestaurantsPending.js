import {StyleSheet, Text, View, Image, Alert, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firestore} from '../../firebase/config';
import {addData, deleteData} from '../../firebase/helpers';
import Loading from '../../components/Loading';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import RestaurantSkeleton from '../../components/RestaurantSkeleton';
import { colors, shadowStyles } from '../../styleVariable';
import {showToast} from '../../toast/index'
import OverlayCustom from '../../components/Overlay';

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
    Alert.alert(
      'Thông báo',
      'Bạn thực sự muốn duyệt cửa hàng?', // <- this part is optional, you can pass an empty string
      [
        {text: 'Hủy', onPress: () => console.log('OK Pressed')},
        {text: 'Duyệt', onPress: () => {
          setLoading(true);
          const pm1 = addData('restaurants', item);
          const pm2 = deleteData('storePending', item.id);
          Promise.all([pm1, pm2]).then(() => {
            getRestaurants();
            setLoading(false);
            showToast()
          });
        }},
      ],
      {cancelable: false},
    );
  };
  const handleDeleteRes = item => {
    Alert.alert(
      'Thông báo',
      'Bạn thực sự muốn hủy cửa hàng?', // <- this part is optional, you can pass an empty string
      [
        {text: 'Hủy', onPress: () => console.log('OK Pressed')},
        {text: 'Đồng ý', onPress: () => {
          setLoading(true);
          deleteData('storePending', item.id, item.img).then(() => {
            getRestaurants();
            setLoading(false);
            showToast()
          });
        }},
      ],
      {cancelable: false},
    );
  };
  console.log(restaurants);

  if(loadData) return (<RestaurantSkeleton/>)

  return restaurants === [] ? (
    <View style={styles.container}>
      <Image source={require('../../assets/empty.png')} />
    </View>
  ) : (
    <View style={styles.container}>
      <OverlayCustom loading={loading}/>
      <ScrollView style={[styles.list]}>
        {restaurants.map(item => (
          <View style={[styles.item, shadowStyles.shadow]} key={item.id}>
            <View >
            <Text style={{color: colors.text_color}}>{item.name}</Text>
            <Text>{item?.date_release || '----'}</Text>
            <Text>Mã số: {item.id || '----'}</Text>
            <Text>Chủ cửa hàng: {item.user.email}</Text>
            </View>

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
      </ScrollView>
    </View>
  );
};

export default RestaurantsPending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    margin: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: '#ddd'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    backgroundColor: colors.white_color,
    marginBottom: 2,
    padding: 10,
  },
  btnRight: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  btnItem: {
    marginRight: 20,
    
  }
});
