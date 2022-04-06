import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../styleVariable'
import { getData, setData } from '../localStorage.js/storage'
import AntDesign from 'react-native-vector-icons/AntDesign'

const HistoryItem = ({item, history, setHistory, index, navigation}) => {
    const handleRemoveItem = (index) => {
        history.splice(index, 1)
        setData(history)
        getData()
        .then(data => setHistory(data))
    }
  return (
    <View style={styles.itemview}>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('Detail', {item: item})}>
      <Image style={styles.img} source={{uri: item.img}} />
      <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
      <Text onPress={() => handleRemoveItem(index)} style={styles.delete}>
        <AntDesign name='close' size={20} />
      </Text>
    </View>
  )
}

export default HistoryItem

const styles = StyleSheet.create({
    img: {
        width: 40,
        height: 40,
        backgroundColor: colors.gray_color,
        borderRadius: 10
      },
      itemview: {
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 4,
      },
      text: {
        fontWeight: '700',
        color: colors.text_color,
        fontSize: 16,
        marginLeft: 10
      },
      delete: {
          marginLeft: 'auto',
          fontSize: 30,
          padding: 4
      }
})