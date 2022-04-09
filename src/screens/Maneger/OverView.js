import {StyleSheet, Text, View} from 'react-native';
import {Card, Button} from 'react-native-elements';
import React from 'react';
import {colors} from '../../styleVariable';

const OverView = ({route}) => {
  const {item} = route.params;
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>{item.name}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{padding: 0}}
        source={{
          uri: item.img,
        }}
      />
      <View style={{marginBottom: 10}}>
        <View style={styles.section}>
          <Text style={[styles.title, styles.spacing]}>Thông tin</Text>
          <View>
            <Text style={styles.spacing}>
              Longitude: <Text style={styles.subtitle}>{item.lang}</Text>
            </Text>
            <Text style={styles.spacing}>
              Latitude: <Text style={styles.subtitle}>{item.lat}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.section}>
        <Text style={[styles.title, styles.spacing]}>Hoạt động</Text>
          <View>
          <Text style={styles.spacing}>
              Thời gian mở cửa: <Text style={styles.subtitle}>{item?.activeTime.open || '--'}h</Text>
            </Text>
            <Text style={styles.spacing}>
            Thời gian mở cửa: <Text style={styles.subtitle}>{item?.activeTime.close || '--'}h</Text>
            </Text>
          </View>
        </View>
        <View style={styles.section}>
        <Text style={[styles.title, styles.spacing]}>Loại</Text>
          <View>
          <Text style={styles.spacing}>
              Danh mục: <Text style={styles.subtitle}>{item?.category || '--'}</Text>
            </Text>
            <Text style={styles.spacing}>
            HashTag: <Text style={styles.subtitle}>{
              item.tags.map((tag, index) => (
                <Text key={index}>{tag.tag}, </Text>
              ))
            }</Text>
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default OverView;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.text_color,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.blue_color,
  },
  spacing: {
    marginBottom: 12,
  },
});
