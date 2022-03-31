import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { firestore } from '../firebase/config'
import { colors } from '../styleVariable'
import IconAntDesign from 'react-native-vector-icons/AntDesign'

const CategoriesSelector = ({setCategory, category}) => {
    const [categories, setCategories] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        firestore().collection('categories').get()
       .then(data => {
           const newData = []
           data.forEach(item => {
               console.log(item)
               newData.push({id: item.id, text: item._data.category.text, value: item._data.category.value})
           })
           setCategories(newData)
       })
       .catch(err => console.log(err))
    },[])
  console.log(categories)
  
  useEffect(() => {
        const catValue = categories.map(item => {
            return item.value
        })
        const index = catValue.indexOf(`${category}`)
        setIndex(index)
  }, [categories])

  return (
    <SelectDropdown
	data={categories}
	onSelect={(selectedItem, index) => {
        console.log(selectedItem.value)
        return setCategory(selectedItem.value)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.text
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.text
	}}
    defaultValueByIndex = {index}
    // defaultButtonText={defaulText}
    defaultButtonText='--Danh mục--'
    renderDropdownIcon={() => (<IconAntDesign name='down' size={12}/>)}
    buttonStyle={{
        backgroundColor: "#eee",
        height: 30,
        width: 200,
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

export default CategoriesSelector

const styles = StyleSheet.create({})