import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, margin, tag} from '../../../styleVariable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const TagItem = ({navigation, active, item, tagsActive, setTagsActive}) => {
 
  return (
    <Text
      style={[margin.m2 ,tag.tag, {color: colors.text_color}]}>
      <AntDesign name="tago" size={18} /> {item.tag} X
    </Text>
  );
};

export default TagItem;

const styles = StyleSheet.create({
 
});