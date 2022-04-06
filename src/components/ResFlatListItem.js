import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, memo, useState } from 'react'
import { dot, margin, row, shadowStyles } from '../styleVariable';
import { colors } from '../styleVariable';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { distanceCalc } from '../firebase/calc';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getData, setData } from '../localStorage.js/storage';

const ItemView = ({vertical, promotion ,navigation, item, stogare, setHistory}) => {
  const distance = distanceCalc(item.distance, 1)
  const [searchHistory, setSearchHistory] = useState([])
  
  let container = vertical? {flexDirection: 'column'}:{ flexDirection: 'row'}
  useEffect(() => {
    let isMounted = true;
      getData()
      .then(data => {
        if(isMounted ){
        setSearchHistory(data)
        }
      })

      return () => {
        isMounted = false;
      };
  }, [])
  console.log(searchHistory)
  const handelToDetail = item => {
    if(stogare){
      const find = searchHistory.find(data => data.id == item.id)
      if(!find){
        searchHistory.push(item)
        setData(searchHistory)
        setHistory(searchHistory)
      }
    }
    navigation.navigate('Detail', {item: item})
  }
  return (
    !vertical?(<TouchableOpacity onPress={() => handelToDetail(item)}  style={[styles.itemview, container]}>
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
  </TouchableOpacity>):(
    <TouchableOpacity onPress={() => handelToDetail(item)}  style={[styles.itemview, {width: 150, justifyContent: 'space-between'}]}>
       <View style={styles.itemInfo}>
       <Image style={styles.verticalImg} source={{uri: item.img}} />
       <Text style={styles.itemTitle}><AntDesign name='checkcircle' size={16} color={colors.prymary_color}/> {item.name}</Text>
      </View>
      <View style={[row]}>
       <Text>{`Khuyến mãi ${item.promotion}%`}</Text>
      </View>
    </TouchableOpacity>
  )
    
  );
};
export default  memo(ItemView)

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
    verticalImg: {
      width: 120,
      height: 120,
      backgroundColor: colors.gray_color,
      borderRadius: 10
    },
    itemview: {
      borderBottomColor: '#eee',
      borderBottomWidth: 4,
      padding: 10,
    
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