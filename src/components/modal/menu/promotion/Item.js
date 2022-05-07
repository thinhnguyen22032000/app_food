import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PromotionSelector from '../../../selection/PromotionSelector';
import DateTimePicker from '../../../DatePicker';

const Item = ({setPromotion, date, setDate}) => {
  return (
    <View style={{height: '100%', justifyContent: 'space-between'}}>
      
        <DateTimePicker date={date} setDate={setDate}/>
        <PromotionSelector
          setPromotion={setPromotion}
          defaulText={'Khuyến mãi (%)'}
        />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});
