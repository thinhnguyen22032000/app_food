import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import ManegerItem from '../../components/ManegerItem';
import {ID_ADMIN} from '../../adminConfig';
import {UserContext} from '../../contexts/userContext';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sizeIcon, padding, colors} from '../../styleVariable';
import TagManager from '../../components/modal/tag/TagManager';
import {firestore} from '../../firebase/config';
import Logo from '../../share/Logo';

export default function Maneger({navigation}) {
  const {userInfo, logout} = useContext(UserContext);
  const [badge, setBadge] = useState(0);
  console.log(userInfo.uid)

  const handleLogout = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn đăng xuất?', // <- this part is optional, you can pass an empty string
      [
        {text: 'Hủy', onPress: () => console.log('OK Pressed')},
        {text: 'Đăng xuất', onPress: () => logout()},
      ],
      {cancelable: false},
    );
  };

  const loadBadge = () => {
    firestore()
      .collection('storePending')
      .get()
      .then(data => setBadge(data.size))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection('storePending')
      .onSnapshot(documentSnapshot => {
        loadBadge();
      });
    return () => subscriber();
  }, []);

  const fields = [
    {title: 'Cửa hàng của tôi', page: 'Restaurants', icon: () => (<Ionicons name="restaurant-outline" size={sizeIcon.ICON_MANEGER} color="#333"/>)},
    {title: 'Thêm cửa hàng', page: 'AddRestaurant', icon: () => (<IconAntDesign name="pluscircleo" size={sizeIcon.ICON_MANEGER} color="#333"/>)},
    {title: 'Liên hệ với chúng tôi', page: 'Contact', icon: () => (<IconAntDesign name="phone" size={sizeIcon.ICON_MANEGER} color="#333"/>)},
    {title: 'Danh sách yêu thích', page: 'FavoriteList', icon: () => (<IconAntDesign name="hearto" size={sizeIcon.ICON_MANEGER} color="#333"/>)},
    {title: 'Giỏ hàng', page: 'Cart', icon: () => (<IconAntDesign name="shoppingcart" size={sizeIcon.ICON_MANEGER} color="#333"/>)},
  ]

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.header}>
        <Avatar
          source={require('../../assets/avatar.jpg')}
          size={64}
          rounded
          title="TN"
        />
        <View>
          <Text>{userInfo.email}</Text>
          <Text
            onPress={handleLogout}
            style={[padding.p6, {fontSize: 16, color: colors.text_color}]}>
            Đăng xuất
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        {
          fields.map((item, index) => (
            <ManegerItem
            key={index}
            navigation={navigation}
            title={item.title}
            page={item.page}
            icon={item.icon()}
          />
          ))
        }
        {/* admin */}
        {userInfo.uid == ID_ADMIN && (
          <View>
            <ManegerItem
              navigation={navigation}
              title="Cửa hàng chờ"
              page="RestaurantsPending"
              icon={
                <IconAntDesign
                  name="inbox"
                  size={sizeIcon.ICON_MANEGER}
                  color="#333"
                />
              }
              badge={badge}
            />
             <ManegerItem
          navigation={navigation}
          title="Liên hệ"
          page="AdminContact"
          icon={
            <IconAntDesign
              name="phone"
              size={sizeIcon.ICON_MANEGER}
              color="#333"
            />
          }
        />
           <ManegerItem
          navigation={navigation}
          title="Tất cả cửa hàng"
          page="RestaurantAll"
          icon={
            <IconAntDesign
              name="barschart"
              size={sizeIcon.ICON_MANEGER}
              color="#333"
            />
          }
        />
          </View>
        )}
        {/* modal */}
        <TagManager size={sizeIcon.ICON_MANEGER} />
      </View>
      <Text style={{marginTop: 'auto', padding: 10}}>
        Phiên bản hiện tại 1.00
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
   
  },
  content: {
    backgroundColor: '#fff',
  },
});
