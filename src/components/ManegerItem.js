import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { Badge } from 'react-native-elements';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../styleVariable';



const ManagerItem = ({navigation, page, title, icon, badge}) => {
  const handleProcess = () => {
    if(navigation){
      navigation.navigate(page)
    }
  }
  

  return (
    <TouchableOpacity style={styles.item} onPress={handleProcess}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {badge?(<Badge status="error" value={badge} />):null}
      <Text style={styles.arrow}><IconAntDesign name="right" size={18} color="gray" /></Text>
    </TouchableOpacity>
  );
};

export default ManagerItem;

const styles = StyleSheet.create({
    item: {
         flexDirection: 'row',
         padding: 10, 
         alignItems: 'center'
    },
    icon: {
        marginRight: 10
    },
    arrow: {
        marginLeft: 'auto'
    },
    title: {
      fontSize: 16,
      color: colors.text_color,
      marginRight: 10
    }
});
