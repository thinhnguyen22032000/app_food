import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {margin, tag} from '../styleVariable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Tag = ({navigation, active, item, tagsActive, setTagsActive}) => {
  const handleProcess = () => {
    if(navigation) {
      navigation.navigate('HashTag', {item: item})
      return
    } 
    if(active) {
      // const filterTagsActive = tagsActive.filter(tag=> tag!= item.tag)
      // setTagsActive([...filterTagsActive])
      // return
    }
    if(setTagsActive){
      // tagsActive.push(item.tag)
      // setTagsActive([...tagsActive])
      tagsActive.pop()
      tagsActive.push(item.tag)
      setTagsActive([...tagsActive])
      return
    }
  }
  
  // const handleRemoveActive = () => {
  //   // const tagsActive = tagsActive.filter(tags => tags.id != item.id)
  //   // setTagsActive([...tagsActive])
  //   alert('daa')
  // }
  console.log(tagsActive)
  return (
    <Text
      onPress={handleProcess}
      style={[margin.m2 ,tag.tag, active ? tag.tagActive : null]}>
      <AntDesign name="tago" size={18} /> {item.tag} { active? (<Feather name='delete' size={18}/>):null}
    </Text>
  );
};

export default Tag;

const styles = StyleSheet.create({
 
});
