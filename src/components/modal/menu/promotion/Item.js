import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PromotionSelector from '../../../selection/PromotionSelector'

const Item = ({setPromotion}) => {
    
    return (
        <PromotionSelector  setPromotion={setPromotion} defaulText={'Khuyến mãi (%)'}/>
    )
  
}

export default Item

const styles = StyleSheet.create({})