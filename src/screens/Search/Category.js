import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../contexts/userContext';
import ItemView from '../../components/ResFlatListItem';
import { colors } from '../../styleVariable';

const Category = ({route, navigation}) => {
  const {item} = route.params;
  const {restaurants} = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const filter = restaurants.filter(data => {
      return data.category == item.name;
    });
    setData(filter);
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={styles.header}>
        <Text style={styles.title}>{item.text}</Text>
      </View>
      <ScrollView style={{margin: 10}}>
        {data.map(item => (
          <ItemView key={item.id} item={item} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    height: 50, alignItems: 'center', justifyContent: 'center',marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text_color
  }
});
