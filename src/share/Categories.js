import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../styleVariable'

const categories = [
    {   id: 1,
        source: require('../assets/categories/rice2.jpg'),
        text: 'Cơm',
        name:'com'
    },
    {   id: 2,
        source: require('../assets/categories/drinks.jpg'),
        text: 'Đồ uống',
        name: 'do_uong'
    },

    {   id: 3,
        source: require('../assets/categories/chicken2.jpg'),
        text: 'Gà',
        name: 'ga'
    },
    {   id: 4,
        source: require('../assets/categories/pho2.jpg'),
        text: 'Phở',
        name: 'pho'
    },
    // {   id: 5,
    //     source: require('../assets/categories/annhanh2.jpg'),
    //     text: 'Ăn nhanh',
    //     name: 'an_nhanh'

    // },


]
const Categories = ({navigation}) => {
    const goCategoty = (item) => {
        return navigation.navigate('Category', {item: item})
    }
  return (
    <ScrollView  horizontal={true} style={styles.container}>
      {
          categories.map((item) => (
            <TouchableOpacity style={styles.item} key={item.id} onPress={() => goCategoty(item)}>
                <Image style={styles.section} resizeMode={'cover'} source={item.source}/>
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
    item: {
      alignItems: 'center',
      padding: 2,
      backgroundColor: colors.prymary_bg,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginRight: 10,

    },
    section: {
       margin: 10,
       width: 50,
       height: 50,
      
    }
})