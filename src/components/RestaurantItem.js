import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors, shadowStyles} from '../styleVariable';

const RestaurantItem = ({navigation, item}) => {
  const handleDetail = item => {
    navigation.navigate('OverView', {item: item});
  };

  const handleEdit = item => {
    navigation.navigate('RestaurantUpdate', {item: item});
  };

  const handleToMenu = item => {
    navigation.navigate('Menu', {item: item});
  };
  const temp = item?.promotion?.promotion
  return (
    <View style={[styles.item, shadowStyles.shadow]}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => handleDetail(item)}>
        <Image style={styles.img} source={{uri: item.img}} />
        <View>
          <Text style={{color: colors.text_color}}>{item.name}</Text>
          <Text style={{color: colors.text_color}}>{temp && temp != "0"? `Đang khuyến mãi ${temp}%`: null}</Text>
          <Text>Khai trương: {item?.date_release || '----'}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.groupAction}>
        <Text onPress={() => handleEdit(item)} style={{marginRight: 20}}>
          <IconAntDesign name="edit" size={20} color="#333" />
        </Text>
        <Text onPress={() => handleToMenu(item)}>
          <Entypo name="menu" size={20} color="#333" />
        </Text>
      </View>
    </View>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
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
    // borderBottomColor: '#dbd9d5',
    // borderBottomWidth: 2,
    marginBottom: 30,
    marginBottom: 2,
    backgroundColor: colors.white_color,
    padding: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupAction: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
});
