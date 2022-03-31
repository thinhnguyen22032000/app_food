import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../styleVariable'

const categories = [
    {   id: 1,
        source: require('../assets/categories/rice.gif'),
        text: 'Cơm',
        name:'com'
    },
    {   id: 2,
        source: require('../assets/categories/milktea.gif'),
        text: 'Đồ uống',
        name: 'do_uong'
    },

    {   id: 3,
        source: require('../assets/categories/chicken.gif'),
        text: 'Gà',
        name: 'ga'
    },
    {   id: 4,
        source: require('../assets/categories/pho.gif'),
        text: 'Phở',
        name: 'pho'
    },
    {   id: 5,
        source: require('../assets/categories/annhanh.gif'),
        text: 'Ăn nhanh',
        name: 'an_nhanh'

    },


]
const Categories = ({navigation}) => {
    const goCategoty = (item) => {
        return navigation.navigate('Category', {item: item})
    }
  return (
    <ScrollView  horizontal={true} style={styles.container}>
      {
          categories.map((item) => (
            <TouchableOpacity style={{alignItems: 'center'}} key={item.id} onPress={() => goCategoty(item)}>
                <Image style={styles.section} resizeMode={'contain'} source={item.source}/>
                <Text style={{color: colors.text_color, fontWeight: '600'}}>{item.text}</Text>
            </TouchableOpacity>
          ))
      }
    </ScrollView>
  )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10
    },
    section: {
       margin: 10,
       width: 50,
       height: 50,
    }
})