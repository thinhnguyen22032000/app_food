import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import { colors } from '../styleVariable';

const Empty = ({message}) => {
  return (
    <View  style={styles.container}>
      <Image
        style={styles.img}
        source={require('../assets/sad.png')}
      />
      <Text style={styles.text}>{message || 'Không tìm thấy'}</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
    container: {
        marginTop: '20%',
       justifyContent: 'center',
       alignItems: 'center',
    },
    img: {
        width: 100,
        height: 100
    },
    text: {
       fontSize: 20,
       color: colors.text_color
    }
});
