import {StyleSheet, Text, View, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MenuModalAdd from '../../components/modal/menu/menu/MenuModalAdd';
import PromotionModal from '../../components/modal/menu/promotion/PromotionModal';
import {colors} from '../../styleVariable';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import { Button } from 'react-native-elements';

const Menu = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <View style={{padding: 20, flex: 1}}>
      <View>
        <Text
          style={{color: colors.text_color, fontSize: 18, fontWeight: 'bold'}}>
          <Entypo name="shop" size={18} color={colors.text_color} /> {item.name}
        </Text>
      </View>
      <Text>
        Các chức năng giúp bạn quản lý cửa hàng tôt hơn.
      </Text>
      <View style={{marginTop: 20}}>
        <View style={{marginBottom: 10}}>
        <MenuModalAdd titleModal={'Thêm thực đơn'} lable={'Thêm thực đơn'} item={item} navigation={navigation} />
        </View>
        <View>
        <PromotionModal titleModal={'Thêm khuyến mãi'} lable={'Thêm khuyến mãi'} navigation={navigation} item={item} />
        </View>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 18,
  },
});
