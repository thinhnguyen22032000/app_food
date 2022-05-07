import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { colors, tag } from '../../../styleVariable'
import { getData } from '../../../firebase/helpers'
import { firestore } from '../../../firebase/config'
import TagItem from './TagItem'


const TagSelector = ({setTagSelector, tagSelector}) => {

    const [tags, setTags] = useState([])
    const [tagsFilter, setTagsFilter] = useState([])

  useEffect(() => { // get tags from db
     let isMounted = true
     if(isMounted){
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
     }
     return () => isMounted = false
  },[])

  const handlePopTag = item => {  // delete tag 
    const filterData = tagSelector.filter(tag => tag.id != item.id);
    
    setTagSelector(filterData);
  };

 
  // filter tags change
  useEffect(() => {

    let tagIdSelector = []
    tagSelector.forEach(tagSelector => {
      tagIdSelector.push(tagSelector.id)
    })
    console.log('active tag: ', tagSelector)
    console.log('tagIdSelector: ', tagIdSelector)
    const data = tags.filter((item) => {
        if(!tagIdSelector.includes(item.id)){ // ko có id nào nằm trong tagIdSelector
          console.log('da loc', tagIdSelector.includes(item.id))
            return item
        }
    })
    setTagsFilter(data)
   
  }, [tagSelector])

  console.log(tagsFilter)
  return (
    <View style={styles.section}>
    <View style={styles.tagsContainer}>
    {tagSelector.map(item => (
      <TouchableOpacity key={item.id} onPress={() => handlePopTag(item)}>
        <TagItem active item={item} />
      </TouchableOpacity>
    ))}
  </View>
    <SelectDropdown
	data={tagsFilter}
	onSelect={(selectedItem, index) => {
        const newData = [...tagSelector] // clone tags
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
    </View>
  )
}

export default TagSelector

const styles = StyleSheet.create({
  tagsContainer: {
    flex: 1,
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})