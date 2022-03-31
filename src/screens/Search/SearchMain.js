import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {UserContext} from '../../contexts/userContext';

import {center, colors, container} from '../../styleVariable';

import ItemView from '../../components/ResFlatListItem';


const SearchMain = ({navigation}) => {
  const {restaurants} = useContext(UserContext);
  const [dataFilter, setDataFilter] = useState([]);
  const [flag, setFlag] = useState(false);
  const [focus, setFocus] = useState(false)

  const [search, setSearch] = useState('');

  const handleSearch = text => {
    const data = restaurants.filter(item => {
      const isIn = item.name.toLowerCase().includes(text.toLowerCase());
      if (isIn) return item;
    });
    data.sort((a, b) => a.distance - b.distance);
    setFlag(true);
    setDataFilter(data);
    console.log('filter', data);
    setSearch(text);
  };

  return (
    <View style={[container, styles.container]}>
      <View></View>
      <View style={styles.conItem}>
        <View style={styles.searchContainer}>
          <EvilIcons style={styles.searchIcon} name="search" size={28} />
          <TextInput
            onChangeText={text => handleSearch(text)}
            style={[styles.textInput]}
            placeholder="Nhập tên món ăn..."
            value={search}
            onFocus={() => setFocus(true)}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => setSearch('')}>
            <Feather name="delete" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.conItem}>
        {dataFilter.length === 0 && flag === true ? (
          <View style={center}>
            <Image
              style={styles.imgSearch}
              source={require('../../assets/notfound.jpg')}
            />
          </View>
        ) : (
          <View style={{marginBottom: 100}}>
            <FlatList
              data={dataFilter}
              renderItem={({item}) => (
                <ItemView item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchMain;

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
        height: 50,
        marginBottom: 10,
        backgroundColor: colors.inputSearch_color,
      },
      bgWhite: {
        backgroundColor: colors.white_color, 
      },
      searchIcon: {
        color: colors.text_color,
        width: '10%',
      },
      textInput: {
        width: '70%',
        
      },
});
