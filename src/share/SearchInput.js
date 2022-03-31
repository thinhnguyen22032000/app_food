import {View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, Touchable} from 'react-native';
import React from 'react';
import {colors, container, row} from '../styleVariable';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const SearchInput = ({navigation}) => {

  const handleForcusSearch = () => {
    navigation.navigate('SearchMain')
  }

  return (
    <View >

      <View style={styles.searchContainer}>
        <EvilIcons style={styles.searchIcon} name="search" size={28} />
        
         <Text onPress={handleForcusSearch}>Tìm kiếm quán ăn...</Text>
       
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.text_color,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#ddd",
    borderWidth: 2,
    height: 40,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.inputSearch_color,
  },
  searchIcon: {
    color: colors.text_color,
    width: '10%',
  },
  textInput: {
    width: '70%',
    
  },
});
