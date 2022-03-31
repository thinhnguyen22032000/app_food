import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../contexts/userContext';

import {center, colors, container} from '../../styleVariable';
import SearchInput from '../../share/SearchInput';
import Position from '../../share/Position';
import ItemView from '../../components/ResFlatListItem';
import Slider from '../../components/Slider';
import Categories from '../../share/Categories';

export default function Search({navigation}) {
  const {position, setPosition, restaurants} = useContext(UserContext);
  const [positionName, setPositionName] = useState();

  restaurants.map(item => {
    console.log('res: ', item);
  });

  return (
    <View style={[container, styles.container]}>
      <View>
        <Position
          positionName={positionName}
          setPositionName={setPositionName}
          position={position}
          setPosition={setPosition}
        />
      </View>
      <View style={styles.conItem}>
        <SearchInput navigation={navigation} />
      </View>
      <ScrollView style={{marginBottom: 100, width: "100%" }}>
        <Slider />
        <Categories navigation={navigation}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text_color, padding: 10}}>Gợi ý cho bạn</Text>
        {
          restaurants.map((item) => (
            <ItemView key={item.id} item={item} navigation={navigation} />
          ))
        }
        {/* <FlatList
          data={restaurants}
          renderItem={({item}) => (
            <ItemView item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  conItem: {},
  imgSearch: {
    width: 100,
    height: 100,
  },
});
