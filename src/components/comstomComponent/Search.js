import { StyleSheet, Text, View , ScrollView} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../contexts/userContext'
import InputCustom from '../Input'

const Search = ({data, setData, placeholder}) => { // pr1: component, pr3: string compare

  const [text, setText] = useState('')


  const sortName = (array) => {
    const dataFilter = array.sort((a, b) => {
      a.name.localeCompare(b.name)
    })
    return dataFilter
  }

  const handleTextChange = (text) => {
     console.log(text)
      setText(text)
      const dataFilter = data.filter(item => {
        const isIn = item?.name.toLowerCase().includes(text.toLowerCase());
        if (isIn) return item;
      })
      console.log(dataFilter)
      const dataSort = sortName(dataFilter)
      setData(dataSort)
  }
  return (
   
      <View style={{marginTop: 10}}>
      <InputCustom value={text} onChangeText={text=>handleTextChange(text)} placeholder={placeholder}/>
      </View>
  )
}

export default Search

const styles = StyleSheet.create({})