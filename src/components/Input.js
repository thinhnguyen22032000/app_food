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
  height,
  required

}) => {
  const [isFocus, setIsFocus] = useState(false)

  const borderColorStyle = isFocus?colors.gray_color:colors.borderColor
  // const borderColorStyleErr = errorMessage?colors.prymary_color:colors.gray_color

  const handleChangeFocus = () => {
    setIsFocus(!isFocus)
  }
  const setHeight = height?height:40
  const requireChar = required?'(*)':''
  return (
    <>
      <Text style={{marginLeft: 10, marginBottom: 1, color: colors.text_color}}>{`${label?label:''} ${requireChar}`}</Text>
      <Input

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
    </>
  );
};

export default InputCustom;

const styles = StyleSheet.create({});
