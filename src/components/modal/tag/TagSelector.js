import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { colors, tag } from '../../../styleVariable'
import { getData } from '../../../firebase/helpers'
import { firestore } from '../../../firebase/config'


const TagSelector = ({setTagSelector, tagSelector}) => {
    const [tags, setTags] = useState([])
    const [tagsFilter, setTagsFilter] = useState([])

  useEffect(() => {
      firestore().collection('tags').get()
     .then(data => {
         const newData = []
         data.forEach(item => {
             newData.push({id: item.id, tag: item._data.tag})
         })
        setTags(newData)
        setTagsFilter(newData)
     })
     .catch(err => console.log(err))
  },[])

  

  useEffect(() => {
    console.log('render-re')
    console.log('tag select',tagSelector)
    let tagIdSelector = []
    tagSelector.forEach(tagSelector => {
      tagIdSelector.push(tagSelector.id)
    })
    const data = tagsFilter.filter((item) => {
        if(!tagIdSelector.includes(item.id)){ // ko có id nào nằm trong tagIdSelector
            return item
        }
    })
    setTagsFilter(data)
  }, [tagSelector])
  console.log('tags:', tags)


  return (
    <SelectDropdown
	data={tagsFilter}
	onSelect={(selectedItem, index) => {
        const newData = [...tagSelector]
        newData.push(selectedItem)
        setTagSelector(newData)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.tag
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.tag
	}}
    defaultButtonText='Chọn tag'
    renderDropdownIcon={() => (<IconAntDesign name='down' size={12}/>)}
    buttonStyle={{
        backgroundColor: colors.white_color,
        height: 30,
        width: 100,
        borderColor: colors.borderColor,
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

export default TagSelector

const styles = StyleSheet.create({})