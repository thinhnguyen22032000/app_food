import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MenuModalAdd from '../../components/modal/menu/MenuModalAdd';
import PromotionModal from '../../components/modal/menu/PromotionModal';


const Menu = ({route}) => {
    const {item} = route.params
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        };
  return (
    <View style={{padding: 20, flex: 1}}>
       <TouchableOpacity onPress={toggleModal} style={styles.section}>
          <Text style={styles.icon}><IconAntDesign name="left" size={18} color="#000" /></Text>
          <Text style={styles.text}>Thêm thực đơn</Text>
       </TouchableOpacity>
       <MenuModalAdd isModalVisible={isModalVisible} setModalVisible={setModalVisible} toggleModal={toggleModal} item={item}/>
      <PromotionModal item={item}/>
  
    </View>
    
  )
}

export default Menu

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