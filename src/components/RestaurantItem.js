import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const RestaurantItem = ({navigation, item}) => {
  const handleDetail = item => {
    navigation.navigate('OverView', {item: item});
  };

  const handleEdit = item => {
    navigation.navigate('RestaurantUpdate', {item: item});
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => handleDetail(item)}>
        <Image style={styles.img} source={{uri: item.img}} />
        <Text>{item.name}</Text>
      </TouchableOpacity>
      <Text onPress={() => handleEdit(item)} style={styles.arrow}>
        <IconAntDesign name="edit" size={20} color="#333" />
      </Text>
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
    borderBottomColor: '#dbd9d5',
    borderBottomWidth: 2,
    marginBottom: 30,
    marginBottom: 2
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: 'auto',
  },
});
