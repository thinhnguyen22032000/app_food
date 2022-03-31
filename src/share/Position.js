import { Text, StyleSheet, View } from 'react-native'
import React, { useEffect, useContext } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../styleVariable';
import axios from 'axios';
import { getCurrentPositionString } from '../map/mapBoxAPI';
import { UserContext } from '../contexts/userContext';

export default function Position({positionName, setPositionName}) {
  const {position, setPosition} = useContext(UserContext);
    
      useEffect(() => {
        if (position != null) {
          const str = getCurrentPositionString(
            position.longitude,
            position.latitude,
          );
          axios
            .get(str)
            .then(data => {
              console.log(data)
              console.log(data.data.features[0].place_name);
              setPositionName(data.data.features[0].place_name);
            })
            .catch(err => console.log('err ', err));
        }
      }, [position]);
 
    return (
        <View style={styles.header}>
        <Entypo style={styles.headerIcon} name="location-pin" size={20} />
        <Text style={styles.headerText}>
          {positionName ? positionName : 'Dang tim vi tri....'}
        </Text>
      </View>
    )
  
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      headerText: {
        color: colors.desc_color,
      },
      headerIcon: {
        color: colors.prymary_color,
      },
})