import { View, Text } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import React from 'react'
import { colors } from '../../styleVariable'
import IconAntDesign from 'react-native-vector-icons/AntDesign'

const promotions = ['0','10', '20', '30', '40', '50', '60', '70','80','90' ]

const PromotionSelector = ({defaulText, setPromotion}) => {

 

 console.log('re-red')
  return (
    <SelectDropdown
	data={promotions}
	onSelect={(selectedItem, index) => {
      setPromotion(selectedItem)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
    defaultButtonText={defaulText}
    renderDropdownIcon={() => (<IconAntDesign name='down' size={12}/>)}
    buttonStyle={{
        backgroundColor: colors.white_color,
        height: 30,
        width: '90%',
        borderColor: colors.borderColor,
        borderWidth: 1,
        borderRadius: 4,
    }}
    dropdownStyle={{
        borderBottomColor: colors.white_color
    }}
    buttonTextStyle={{
        fontSize: 12
    }}
/>
  )
}

export default PromotionSelector