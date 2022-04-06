import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import { colors } from '../../styleVariable';

const ModalBase = ({title, toggleModal,isModalVisible, funcHandle, Component}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{alignItems: 'center', margin: 10}}>
            <Component/>
        </View>
        <View style={styles.btnGroup}>
          <Text style={styles.btnModal} onPress={toggleModal}>
            Hủy
          </Text>
          <Text style={styles.btnModal} onPress={funcHandle}>
            Lưu
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBase;

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
