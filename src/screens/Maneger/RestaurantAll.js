import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../../contexts/userContext';
import RestaurantInfo from '../../components/RestaurantInfo';
import Search from '../../components/comstomComponent/Search';

const RestaurantAll = () => {
  const {restaurants} = useContext(UserContext);
  const [data, setData] = useState(restaurants);

  return (
    <View style={{flex: 1}}>
      <Search
        placeholder={'Tên cửa hàng'}
        data={restaurants}
        setData={setData}
      />
      <ScrollView>
        {data.map((item, index) => (
          <RestaurantInfo item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RestaurantAll;

const styles = StyleSheet.create({});
