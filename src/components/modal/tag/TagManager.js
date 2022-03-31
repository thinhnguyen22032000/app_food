import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { colors, row } from '../../../styleVariable';
import InputCustom from '../../Input';
import ButtonCustom from '../../Button';
import { addData } from '../../../firebase/helpers';

const TagManager = ({size}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [tag, setTag] = useState('')
    const [err, setErr] = useState(null)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setErr(null)
        setTag('')
        };

    const handleCreateTag = () => {
         if(tag === '') {
            setErr('Vui lòng điền đủ thông tin')
            return
         }
         addData('tags', {
             tag:tag
         })
         .then(() => {
            setTag('')
            setModalVisible(false)
            alert("Thêm thành công")
         })
         .catch(() => alert("Có lỗi"))

    }
  return (
    <View>
      <View>
        <TouchableOpacity
          style={[styles.itemTouch, {alignItems: 'center'}]}
          onPress={toggleModal}>
          <Text style={styles.icon}>
            <AntDesign name="tago" size={size} color={colors.text_color} />
          </Text>
          <Text style={styles.title}>Tạo hashtag</Text>
          <Text style={styles.arrow}>
            <IconAntDesign name="right" size={18} color="gray" />
          </Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Tạo hashtag</Text>
            </View>
            <InputCustom
              value={tag}
              onChangeText={setTag}
              placeholder={'Nhập hashtag'}
              errorMessage={err}
            />
            <View style={[row, styles.btnGroup]}>
              <Text style={{padding: 10, fontSize: 16}} onPress={toggleModal}>Hủy</Text>
              <Text style={{padding: 10, fontSize: 16}} onPress={handleCreateTag}>Lưu</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default TagManager

const styles = StyleSheet.create({
    itemTouch: {
        flexDirection: 'row',
        padding: 10, 
    },
    modalContainer: {
        backgroundColor: colors.white_color,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.text_color
    },
    btnGroup: {
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    icon: {
        marginRight: 10
    },
    arrow: {
        marginLeft: 'auto'
    },
    title: {
      fontSize: 16,
      color: colors.text_color
    }
})