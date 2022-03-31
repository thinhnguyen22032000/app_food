import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Input} from 'react-native-elements';
import {colors} from '../styleVariable';

const InputCustom = ({
  placeholder,
  value,
  onChangeText,
  leftIcon,
  width,
  errorMessage,
  label,
  onfocus
}) => {
  return (
      <Input
        onFocus={onfocus}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        leftIcon={leftIcon}
        errorMessage={errorMessage}
        inputContainerStyle={{
          height: 40,
          paddingHorizontal: 16,
          width: width,
          borderWidth: 1,
          borderColor: colors.gray_color,
          borderRadius: 4,
        }}
      />
  );
};

export default InputCustom;

const styles = StyleSheet.create({});
