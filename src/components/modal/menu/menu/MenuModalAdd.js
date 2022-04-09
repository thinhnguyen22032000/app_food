import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firestore} from '../../../../firebase/config';
import OverlayCustom from '../../../Overlay';
import ModalBase from '../../ModalBase';
import Item from './Item';
import {handleUpload, updateData} from '../../../../firebase/helpers';
import {showToast} from '../../../../toast';
import MenuItem from '../../../MenuItem'


const MenuModalAdd = ({item, lable, titleModal}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const [menu, setMenu] = useState([]);
  const [menuNum, setMenuNum] = useState(0)
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [subModal, setSubModal] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleSubModal = () => {
    setSubModal(!subModal);
  };
  
  const showModal = () => {
     setSubModal(true)
  }

   

  const loadData = () => {
    firestore().collection('restaurants').doc(item.id).get()
    .then((data) => {
      setMenu(data?._data?.menu || [])
      setMenuNum(data?._data?.menu.length || 0)
    })
    .catch(err => console.log(err))
  };

  useEffect(() => {
    const subscribe = firestore().collection('restaurants').doc(item.id)
                         .onSnapshot(onsnap => {
                              loadData() 
                      
                         })
       return () => subscribe()
  }, []);

  const createDish = async item => {
    if (name !== '' && price !== '' && img !== null) {
      setLoading(true);
      menu.push({
        name: name,
        price: price,
        img: await handleUpload(img.uri),
      });
      updateData('restaurants', item.id, {menu: menu}, item)
        .then(() => {
          setImg(null);
          setName('');
          setPrice('');
          setLoading(false);
          setModalVisible(!isModalVisible)
          showToast();
        })
        .catch(err => {
          setLoading(false);
          alert('Thất bại');
          console.log(err);
        });
    } else {
      setErr('Vui long điền đủ thông tin.');
    }
  };

  return (
   <View>
      <ModalBase
      showModal={showModal}
      lable={lable}
      titleModal={titleModal}
      funcHandle={()=>createDish(item)}
      badge={menuNum}
      isModalVisible={isModalVisible}
      toggleModal={toggleModal}>

      <OverlayCustom loading={loading} />
      <Item
        setName={setName}
        setPrice={setPrice}
        setImg={setImg}
        img={img}
        err={err}
      />
    </ModalBase>
    {/* submodal */}
    <ModalBase hide  titleModal={'Danh sách thực đơn'} isModalVisible={subModal} toggleModal={toggleSubModal}>
        <ScrollView>
        {
          menu.map((menu, index) => (
            <TouchableOpacity key={index}>
            <MenuItem item={menu} percent={item.promotion}/>
            </TouchableOpacity> 
          ))
        } 
        
        </ScrollView>
    </ModalBase>
   </View>
  );
};

export default MenuModalAdd;

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
