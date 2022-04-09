import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../styleVariable';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const ModalBase = ({titleModal,
    toggleModal,
    isModalVisible,
    lable, 
    funcHandle,
    badge,
    desc,
    children,
    showModal,
    hide
  }) => {
  return (
    <View>
     {!hide?(
        <TouchableOpacity onPress={toggleModal} style={styles.section}>
        <Text style={styles.icon}>
          <IconAntDesign name="plus" size={18} />
        </Text>
        <Text style={styles.text}>
          {lable} {desc && desc != 0 ? `(khuyễn mãi ${desc}%)` : null}{' '}
          {badge ? (<Text onPress={showModal} style={{color: colors.blue_color}}>{`Hiện thị (${badge})`}</Text>) : null}
        </Text>
      </TouchableOpacity>
     ):(
       null
     )}
      <Modal  isVisible={isModalVisible}>
       
        <View style={[styles.modalContainer, { flex: 1, maxHeight: 400}]}>
          <View style={styles.header}>
            <Text style={styles.title}>{titleModal}</Text>
          </View>
          <View style={{alignItems: 'center', margin: 10, flex: 1}}>{children}</View>
          <View style={styles.btnGroup}>
            <Text style={styles.btnModal} onPress={toggleModal}>
              Hủy
            </Text>
            {
              hide?(null):(
                <Text style={styles.btnModal} onPress={funcHandle}>
                Lưu
              </Text>
              )
            }
          </View>
        </View>
       
      </Modal>
    </View>
  );
};

export default ModalBase;

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
    backgroundColor: colors.white_color
  },
});
