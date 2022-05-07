import {StyleSheet, Text, View} from 'react-native';
import React from 'react';


import MenuModalAdd from '../../components/modal/menu/menu/MenuModalAdd';
import PromotionModal from '../../components/modal/menu/promotion/PromotionModal';
import {colors} from '../../styleVariable';
import Entypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign'


const Menu = ({route, navigation}) => {
  const {item} = route.params;
  
  function handleToOrders(item){
    navigation.navigate('Orders', {item: item})
  }
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
        <View style={{marginBottom: 10, marginLeft: 1}}>
        <MenuModalAdd titleModal={'Thêm thực đơn'} lable={'Thêm thực đơn'} item={item} navigation={navigation} />
        </View>
        <View style={{ marginLeft: 1}}>
        <PromotionModal titleModal={'Thêm khuyến mãi'} lable={'Thêm khuyến mãi'} navigation={navigation} item={item} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <IconAntDesign name="plus" size={18} />
          <Text onPress={() => handleToOrders(item)} style={{fontSize: 18}}> Đơn hàng</Text>
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
