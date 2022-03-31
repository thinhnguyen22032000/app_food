
import React from 'react';
import {Button} from 'react-native-elements';
import { colors } from '../styleVariable';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function ButtonCustom({title, bgColor, onPress, width}) {
  return (
    <TouchableOpacity
     style={[styles.button,
       {backgroundColor: bgColor || colors.prymary_color,
        width: width
       }
     ]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
