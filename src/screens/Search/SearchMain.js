import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {UserContext} from '../../contexts/userContext';

import {center, colors, container, row} from '../../styleVariable';

import ItemView from '../../components/ResFlatListItem';
import { getData, setData } from '../../localStorage.js/storage';
import Loading from '../../components/Loading';
import HistoryItem from '../../components/HistoryItem';
import Empty from '../../components/Empty';

const SearchMain = ({navigation}) => {
  const {restaurants} = useContext(UserContext);
  const [dataFilter, setDataFilter] = useState([]);
  const [flag, setFlag] = useState(false);
  const [focus, setFocus] = useState(false)

  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false)

  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    getData()
    .then((data => setHistory(data)))
  }, [])

  const handleSearch = text => {
    setLoading(true)
    setSearch(text);  

    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      const data = restaurants.filter(item => {
        const isIn = item.name.toLowerCase().includes(text.toLowerCase());
        if (isIn) return item;
      });
      data.sort((a, b) => a.distance - b.distance);
      setFlag(true);
      setLoading(false)
      setDataFilter(data);
      console.log('loading')
    }, 400)
  };

  const removeAllItem = () => {
    const newData = []
    setData(newData)
    getData()
    .then(data => setHistory(newData))
    .catch(err => console.log(err))
  }
  
  const handleRemoveAll = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có xóa tất cả?', // <- this part is optional, you can pass an empty string
      [
        {text: 'Hủy', onPress: () => console.log('OK Pressed')},
        {text: 'Xóa', onPress: () => removeAllItem()},
      ],
      {cancelable: false},
    )
  }

  return (
    <View style={[]}>
      <View style={styles.conItem}>
        <View style={styles.searchContainer}>
          <EvilIcons style={styles.searchIcon} name="search" size={28} />
          <TextInput
            onChangeText={text => handleSearch(text)}
            style={[styles.textInput]}
            placeholder="Tìm nhà hàng, món ăn"
            value={search}
            onFocus={() => setFocus(true)}
          />
          {
            loading? (
              <View style={{width: '20%'}}>
                <Loading/>
              </View>
            ):(
              <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => setSearch('')}>
              <Feather name="delete" size={20} />
            </TouchableOpacity>
            )
          }
        </View>
      </View>
      <View style={container}>
      {
        search !== ''? (
          <View style={styles.conItem}>
          {dataFilter.length === 0 && flag === true ? (
           <Empty/>
          ) : (
            <View style={{marginBottom: 100}}>
              <FlatList
                data={dataFilter}
                renderItem={({item}) => (
                  <ItemView stogare item={item} navigation={navigation} setHistory={setHistory} />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          )}
        </View>

        ):(
          <View style={styles.conItem}>
         <View style={styles.historyHeader}>
          <Text style={{fontSize: 16, color: colors.text_color}}>Gần đây</Text>
          <Text onPress={handleRemoveAll} style={{color: colors.prymary_color}}>Xóa tất cả</Text>
         </View>
          <View style={{marginBottom: 100}}>
            <FlatList
              data={history}
              renderItem={({item, index}) => (
                <HistoryItem key={index} history={history} setHistory={setHistory} item={item} index={index} navigation={navigation} />
              )}
            />
          </View>
      </View>
        )
      }
      </View>

      {/*  */}
      
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
        justifyContent: 'space-between',
        height: 40,
        borderRadius: 10,
        backgroundColor: "#eee",
        marginLeft: 20,
        marginRight: 20,
      },
      bgWhite: {
        backgroundColor: colors.white_color, 
      },
      searchIcon: {
        color: colors.text_color,
        width: '10%',
      },
      textInput: {
        flex: 1
      },
      historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
      }
});
