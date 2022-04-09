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
import RestaurantSkeleton from '../../components/RestaurantSkeleton'
import ResPromotion from '../../share/ResPromotion';

export default function Search({navigation}) {
  const {position, setPosition, restaurants} = useContext(UserContext);
  const [data, setData] = useState([])
  const [positionName, setPositionName] = useState();
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    let data = restaurants.sort((a, b) => a.distance - b.distance);
    setData(data)
  }, [restaurants])

  return (
    <View style={[container]}>
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
        <View style={{marginTop: 10, marginBottom: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text_color, padding: 10}}>KHUYẾN MÃI</Text>
          {
            restaurants.length? (<ResPromotion navigation={navigation}/>):(
                <View style={{width: '100%', height: 120, backgroundColor: '#ddd'}}></View>
            )
          }
        
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text_color, padding: 10}}>GỢI Ý CHO BẠN</Text>
        {
          restaurants.length? ( data.map((item) => (
            <ItemView key={item.id} item={item} navigation={navigation} />
          ))):(
            <RestaurantSkeleton/>
          )
        }
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
