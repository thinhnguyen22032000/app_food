import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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
  secureTextEntry,
  keyboardType,
  height

}) => {
  const [isFocus, setIsFocus] = useState(false)

  const borderColorStyle = isFocus?colors.gray_color:colors.borderColor

  const handleChangeFocus = () => {
    setIsFocus(!isFocus)
  }
  const setHeight = height?height:40
  return (
      <Input
        label={label}
        onBlur={handleChangeFocus}
        onFocus={handleChangeFocus}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        leftIcon={leftIcon}
        errorMessage={errorMessage}
        inputContainerStyle={{
          height: setHeight,
          paddingHorizontal: 16,
          width: width,
          borderWidth: 1,
          borderColor: borderColorStyle,
          borderRadius: 4,
        }}
      />
  );
};

export default InputCustom;

const styles = StyleSheet.create({});
