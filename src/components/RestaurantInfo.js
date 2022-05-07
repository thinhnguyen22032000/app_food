import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useState, useRef} from 'react';
import {colors, shadowStyles} from '../styleVariable'
import {updateData} from '../firebase/helpers'
import { showToast } from '../toast';
import OverlayCustom from '../components/Overlay';



const RestaurantInfo = ({item}) => {
    const isToggle = item.show? item.show : false
    const toggleRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [isEnabled, setIsEnabled] = useState(isToggle)
    console.log('istoggle: ',item.name, isToggle)

  const toggleSwitch = () => {

    setIsEnabled(!isEnabled)
    
    if(toggleRef.current) {
        clearTimeout(toggleRef.current)
    }
    toggleRef.current = setTimeout(() => {
        if(typeof(updateData) !== 'function') return
        updateData('restaurants', item.id, {show: !isEnabled || false})
        .then(() => {
            setIsEnabled(!isEnabled || false);
           
        })
        .catch(err => {
            showToast('Có lỗi xảy ra vui lòng thử lại sau')
            console.log(err)
        })
    }, 400)
  }
  



 

  return (
    <View style={[styles.item, shadowStyles.shadow]}>
       <OverlayCustom loading={loading}/>
      <View>
        <Text style={{color: colors.text_color, fontSize: 18}}>{item.name}</Text>
        <View>
            <Text>Chủ cửa hàng: {item?.user?.email || '--'}</Text>
            <Text>Mã cửa hàng: {item?.id || '--'}</Text>
            <Text>Ngày khai trương: {item?.date_release || '--'}</Text>
        </View>
      </View>
      <View style={styles.groupAction}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? colors.green_color : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>

    </View>
  );
};

export default RestaurantInfo;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    // borderBottomColor: '#dbd9d5',
    // borderBottomWidth: 2,
    marginBottom: 30,
    marginBottom: 2,
    backgroundColor: colors.white_color,
    padding: 10
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupAction: {
    marginLeft: 'auto',
    flexDirection: 'row'
  }
});
