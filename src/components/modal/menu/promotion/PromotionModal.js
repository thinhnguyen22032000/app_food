import { StyleSheet} from 'react-native'
import React, {useEffect, useState} from 'react'
import ModalBase from '../../ModalBase';
import {updateData} from '../../../../firebase/helpers'
import OverlayCustom from '../../../Overlay'
import Item from './Item';
import { firestore } from '../../../../firebase/config';
import { showToast } from '../../../../toast';


const PromotionModal = ({item, navigation, lable, titleModal}) => {
    const [promotion, setPromotion] = useState(undefined)
    const [loading, setLoading] = useState(false);
    const [isHandle, setIsHandle] = useState(false)
    const [desc, setDesc] = useState(null)
    
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const loadData = () => {
        firestore().collection('restaurants').doc(item.id).get()
        .then((data) => setDesc(data._data.promotion))
        .catch(err => console.log(err))
    }

    const handleAddPromotion = () => {
          setLoading(true)
          updateData('restaurants', item.id, {promotion: promotion}, item)
            .then(() => {
              setLoading(false)
              setIsHandle(true)
              setModalVisible(!isModalVisible)
              showToast() 
            })
            .catch(err => {
             setLoading(false)
             showToast('Vui lòng chọn khuyến mãi') 
             console.log(err)
            });
       
    } 

    useEffect(() => {
       const subscribe = firestore().collection('restaurants').doc(item.id)
                         .onSnapshot(onsnap => {
                              loadData() 
                         })
       return () => subscribe()
    },[])
  
  return (
     <ModalBase lable={lable} titleModal={titleModal} funcHandle={handleAddPromotion} desc={desc} isModalVisible={isModalVisible} toggleModal={toggleModal}>
          <OverlayCustom loading={loading} />
         <Item setPromotion={setPromotion}/>
     </ModalBase>
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
        fontSize: 18,
    }
})