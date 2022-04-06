import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import InputCustom from '../../Input';
import {colors} from '../../../styleVariable';
import CurrentImagePicker from '../../CurrentImagePicker';
import { updateData, handleUpload} from '../../../firebase/helpers';
import { firestore } from '../../../firebase/config';
import OverlayCustom from '../../Overlay';


const MenuModalAdd = ({isModalVisible, setModalVisible, toggleModal, item}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null)
  

  useEffect(() => { 
     firestore().collection('restaurants').doc(item.id).get()
     .then((data) => {
         setMenu(data?._data?.menu || [])
     })
     .catch(err => console.log(err))
  }, [])
  console.log('menu: ', menu)

  const createDish = async item => {
    if (name !== '' && price !== '' && img !== null) {
        setLoading(true)
        menu.push({
            name: name,
            price: price,
            img: await handleUpload(img.uri),
         })
      updateData('restaurants', item.id, {menu:menu}, item)
        .then(() => {
          setLoading(false)
          setModalVisible(false)
          setImg(null)
          setName('')
          setPrice('')
          alert('Thành công');
        })
        .catch(err => {
         setLoading(false)
         alert('Thất bại');
          setModalVisible(false)
          console.log(err)

        });
    } else {
      setErr('Vui long điền đủ thông tin.');
    }
  };
  return (
    <Modal isVisible={isModalVisible}>
        <OverlayCustom loading={loading}/>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Thêm thực đơn</Text>
        </View>
        <InputCustom errorMessage={err} onChangeText={setName} placeholder={'Tên món ăn...'} />
        <InputCustom errorMessage={err} onChangeText={setPrice} placeholder={'Giá...'} />
        <CurrentImagePicker error={err} img={img} setImg={setImg} />
        <View style={styles.btnGroup}>
          <Text style={styles.btnModal} onPress={toggleModal}>
            Hủy
          </Text>
          <Text style={styles.btnModal} onPress={() => createDish(item)}>Lưu</Text>
        </View>
      </View>
    </Modal>
  );
};

export default MenuModalAdd;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white_color,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text_color,
  },
  btnGroup: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  icon: {
    marginRight: 10,
  },
  arrow: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 16,
    color: colors.text_color,
  },
  btnModal: {
    padding: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    minWidth: 60,
    textAlign: 'center',
    color: colors.text_color,
  },
});
