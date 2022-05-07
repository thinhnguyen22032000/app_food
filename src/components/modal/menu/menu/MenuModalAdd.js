import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firestore} from '../../../../firebase/config';
import OverlayCustom from '../../../Overlay';
import ModalBase from '../../ModalBase';
import Item from './Item';
import {addData, handleUpload, updateData} from '../../../../firebase/helpers';
import {showToast} from '../../../../toast';
import MenuItem from '../../../MenuItem'
import {getCurrentDate} from '../../../../helpers/index'


const MenuModalAdd = ({item, lable, titleModal}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState();
  const [menu, setMenu] = useState([]);
  const [menuNum, setMenuNum] = useState(0)
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [subModal, setSubModal] = useState(false);
  const [notifyInfo, setNotifyInfo] = useState([])

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

  useEffect(() => {
    const subscriber = firestore()
      .collection('notifies')
      .where('resId', '==', item.id)
      .onSnapshot(documentSnapshot => {
        firestore().collection('notifies').where('resId', '==', item.id).get()
        .then(data => {
           const doc = data._docs[0]
           if(data) setNotifyInfo({data: doc._data, id: doc.id})
       })
       .catch(err => console.log('Lỗi notify : ',err))
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [])
  console.log(notifyInfo)

  // thêm khuyến mãi cho cửa hàng
  const createDish = async item => {
    const array = notifyInfo?.data?.notify || []
    array.push({
      date_notify: getCurrentDate(),
      text: `Cửa hàng ${item.name} vừa có món mới ${name}. Kính mời quí khách đến trãi nghiêm!`
    })
    if (name !== '' && price !== '' && img !== null) {
      setLoading(true);
      menu.push({
        name: name,
        price: price,
        img: await handleUpload(img.uri),
      });
     const pm1 = updateData('restaurants', item.id, {menu: menu}, item)
     let pm2 = null
     if(!notifyInfo){
       pm2 = addData('notifies', {
        resId: item.id,
        uids: item?.like?.uids || [],
        notify: [...array]
      } )
     }else{
         pm2 = updateData('notifies', notifyInfo.id, { uids: item?.like?.uids, notify: [...array]})
     }
      Promise.all([pm1, pm2]).then(() => {
          setImg(null);
          setName('');
          setPrice('');
          setLoading(false);
          setModalVisible(!isModalVisible)
          showToast();
      })
      .catch(err => console.log("Lỗi thông báo thêm món ăn :",err))
    } else {
      setErr('Vui long điền đủ thông tin.');
    }
  };

  return (
   <View>
      <ModalBase
      size={380}
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
    <ModalBase hide size={400}  titleModal={'Danh sách thực đơn'} isModalVisible={subModal} toggleModal={toggleSubModal}>
        <ScrollView>
        {
          menu.map((menu, index) => (
            <TouchableOpacity key={index}>
            <MenuItem item={menu} percent={item.promotion.promotion}/>
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
