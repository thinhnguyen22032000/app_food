import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {UserContext} from '../../contexts/userContext';
import CartItem from '../../components/CartItem';
import { colors } from '../../styleVariable';
import ModalBase from '../../components/modal/ModalBase';
import InputCustom from '../../components/Input'
import { firestore } from '../../firebase/config';
import { updateData } from '../../firebase/helpers';
import { getCurrentDate } from '../../helpers';

const Cart = ({navigation}) => {
  const {cart} = useContext(UserContext);

  const [phoneMumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [allPrice, setAllPrice] = useState(() => {
    let totalPrice = 0;
    cart?.order?.map(item => {
      totalPrice += item.count * item.item.price;
    });
    return totalPrice;
  });

  const checkCart = cart?.order?.length || [];
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  console.log(cart);

  async function handleConfirmOrder(){
     if(Array.isArray(cart.order)){
      const currentDate = getCurrentDate()
      const idStore = {}
      cart.order.forEach(element => {
        if(!idStore.hasOwnProperty(element.idStore)){
          idStore[element.idStore] = {state: false ,dateOrder: currentDate ,orderInfo: [element], userInfo: {phoneMumber, address}}
        }else{
          idStore[element.idStore].orderInfo.push(element)
        }
      });
     for (const key in idStore) {
         firestore().collection('restaurants').doc(key).get()
         .then((data) => {
            let array
            if(!Array.isArray(data._data?.order)){
               array = [] 
            }else{
              array = data._data?.order
            }
            array.push(idStore[key])
             updateData('restaurants', key, {order: array})
            .then(data => console.log('thanh cong'))
            .catch(e => console.log(e))
         })
         .catch(e => console.log(e))
       
    }
    } 
  }

  return (
    <View style={{flex: 1, margin: 14}}>
      {checkCart != 0 ? (
        <ScrollView>
          {cart.order.map((product, index) => (
            <CartItem
              allPrice={allPrice}
              index={index}
              setAllPrice={setAllPrice}
              product={product}
              key={index}
            />
          ))}
          <View style={styles.checkOut}>
            <Text style={{color: colors.text_color}}>Tổng tiền: {allPrice}</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.btnOrder}>
              <Text style={{color: colors.white_color}}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Text>Giỏ hàng hiện đang trống</Text>
      )}

      <ModalBase size={350} btn_2 funcHandle={handleConfirmOrder} titleModal={'Xác nhận đơn'} hide isModalVisible={isModalVisible} toggleModal={toggleModal}>

       <InputCustom label={'Số điện thoại'} required value={phoneMumber} onChangeText={setPhoneNumber}  keyboardType={'numeric'}/>
       <InputCustom label={'Địa chỉ cần giao'} required value={address} onChangeText={setAddress}/>
       <InputCustom label={'Ghi chú'} value={note} onChangeText={setNote}/>
      </ModalBase>
      
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  checkOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.text_color,
    padding: 20
  },
  btnOrder: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.prymary_color,
  }

});
