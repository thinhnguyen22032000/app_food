import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {launchImageLibrary} from 'react-native-image-picker';
import { colors } from '../styleVariable';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const CurrentImagePicker = ({setImg, img, error, required}) => {

const loadImage = () => {
    launchImageLibrary()
        .then(data => {
        setImg({uri: data.assets[0].uri});
        console.log('img: ', data.assets[0].uri);
        })
        .catch(err => console.log('err: ', err));
    };
  return (
    <TouchableOpacity onPress={loadImage}>
        {
          img? (  
            <Image style={[styles.img, { alignSelf: 'center'}]} source={img} />
          ):(
            <View style={[styles.img, styles.imgContainer ]}>
             <Text>Chọn ảnh {required?'(*)': null}</Text>
              {error && (<Text style={{color:colors.prymary_color}}>Vui lòng chọn ảnh</Text>)}
              <EvilIcons name='image' size={50}/>
            </View>
          )
        }
      </TouchableOpacity>
  )
}

export default CurrentImagePicker

const styles = StyleSheet.create({
    img: {
        marginTop: 20,
        width: 120,
        height: 80,
        backgroundColor: colors.border_color,
      },
    imgContainer: {
      borderColor: colors.text_color,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'dotted',
      alignSelf: 'center'
    }
})