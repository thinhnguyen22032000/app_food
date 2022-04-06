import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import ModalBase from '../ModalBase';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import PromotionSelector from '../../selection/PromotionSelector';
import {updateData} from '../../../firebase/helpers'
import OverlayCustom from '../../Overlay';

const PromotionModal = ({item}) => {
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [promotion, setPromotion] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleAddPromotion = () => {
          setLoading(true)
          updateData('restaurants', item.id, {promotion: promotion}, item)
            .then(() => {
              setLoading(false)
              setModalVisible(false)
              alert('Thành công');
            })
            .catch(err => {
             setLoading(false)
             alert('Thất bại');
              setModalVisible(false)
              console.log(err)
    
            });
       
    } 
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
  
  function Item() {
      return (
          <PromotionSelector setPromotion={setPromotion} defaulText={'Khuyến mãi (%)'}/>
      )
  }
  console.log(promotion)
  return (
   <View>
        <OverlayCustom loading={loading}/>
       <TouchableOpacity onPress={toggleModal} style={styles.section}>
          <Text style={styles.icon}><IconAntDesign name="left" size={18} color="#000" /></Text>
          <Text style={styles.text}>Thêm Khuyễn mãi</Text>
       </TouchableOpacity>
   <ModalBase Component={Item} toggleModal={toggleModal} isModalVisible={isModalVisible} title={'Sự kiện khuyến mãi'} funcHandle={handleAddPromotion} />
   </View>
  )
}

export default PromotionModal

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 20
    },
    text: {
        fontSize: 20,
        color: "#000"
    }
})