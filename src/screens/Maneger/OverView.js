import {StyleSheet, Text, View} from 'react-native';
import {Card, Button} from 'react-native-elements';
import React from 'react';

const OverView = ({route}) => {
  const {item} = route.params;
  return (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{padding: 0}}
        source={{
          uri: item.img,
        }}
      />
      <View style={{marginBottom: 10}}>
        <View style={styles.containerItem}>
          <Text>Tọa độ</Text>
          <View>
            <Text>Longitude: {item.lang}</Text>
            <Text>Latitude: {item.lat}</Text>
          </View>
        </View>
        <View style={styles.containerItem}>
          <Text>Thời gian mở cửa: {item?.activeTime?.open || 7}h</Text>
        </View>
      </View>
    </Card>
  );
};

export default OverView;

const styles = StyleSheet.create({
  containerItem: {},
});
