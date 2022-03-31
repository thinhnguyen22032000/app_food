import { View, Text } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import React from 'react'
import { colors } from '../styleVariable'
import IconAntDesign from 'react-native-vector-icons/AntDesign'

const timer = ["7", "8", "9", "10","11", "12", "13", "14", "15"]

const TimerSelect = ({setTimeOpen, setTimeClose, defaulText, timeOpen, timeClose}) => {

  let time
  if(timeOpen){
   time = timer.indexOf(`${timeOpen}`)
  }else{
    time = timer.indexOf(`${timeClose}`) 
  }

  return (
    <SelectDropdown
	data={timer}
	onSelect={(selectedItem, index) => {
        if(setTimeClose){
             setTimeClose(selectedItem)
        }else{
            setTimeOpen(selectedItem)
        }
		console.log(selectedItem, index)
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
    defaultValueByIndex = {time}
    defaultButtonText={defaulText}
    renderDropdownIcon={() => (<IconAntDesign name='down' size={12}/>)}
    buttonStyle={{
        backgroundColor: "#eee",
        height: 30,
        width: 100,
        borderColor: colors.gray_color,
        borderWidth: 1,
        borderRadius: 4,
    }}
    dropdownStyle={{
        
    }}
    buttonTextStyle={{
        fontSize: 12
    }}
/>
  )
}

export default TimerSelect