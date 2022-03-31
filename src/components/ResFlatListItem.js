import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { dot, margin, row, shadowStyles } from '../styleVariable';
import { colors } from '../styleVariable';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { distanceCalc } from '../firebase/calc';
import AntDesign from 'react-native-vector-icons/AntDesign'

const ItemView = ({navigation, item}) => {
  const distance = distanceCalc(item.distance, 1)
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', {item: item})}  style={[styles.itemview]}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}><AntDesign name='checkcircle' size={16} color={colors.prymary_color}/> {item.name}</Text>
        <View style={row}>
          <Text style={styles.itemDesc} ><EvilIcons name="location" size={20} />{distance}km</Text>
          <Text style={dot}></Text>
          <Text><AntDesign name='heart' size={14}/> {item?.like?.count || 0} lượt thích</Text>
        </View>
        <Text style={styles.itemNotify}>Mở cửa: {item?.activeTime?.open || 7}h</Text>
      </View>
      <Image style={styles.img} source={{uri: item.img}} />
    </TouchableOpacity>
  );
};
export default ItemView

const styles = StyleSheet.create({
    container: {
       flexDirection: 'row',
       alignItems: 'center'
    },
    img: {
      width: 80,
      height: 80,
      backgroundColor: colors.gray_color,
      marginLeft: 'auto',
      borderRadius: 10
    },
    itemview: {
      flexDirection: 'row',
      borderBottomColor: '#eee',
      borderBottomWidth: 4,
      padding: 10
    },
    itemInfo: {},
    itemTitle: {
      fontWeight: '700',
      color: colors.text_color,
      fontSize: 16
    },
    itemDesc: {
      color: colors.desc_color
    },
    itemNotify: {
      color: colors.text_color
    }
})