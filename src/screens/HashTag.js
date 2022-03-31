import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Tag from '../components/Tag'
import { colors, container, row } from '../styleVariable'
import { firestore } from '../firebase/config'
import {UserContext} from '../contexts/userContext'
import ItemView from '../components/ResFlatListItem'
import Spinner from 'react-native-loading-spinner-overlay';
import GroupTags from '../components/skeletons.js/GroupTags'

export default function HashTag({navigation, route}) {

  const {item} = route.params

  const {restaurants} = useContext(UserContext)

  const [tags, setTags] = useState([])
  const [tagsActive, setTagsActive] = useState([item.tag])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
       firestore().collection('tags').get()
       .then((data) => {
         const newData = []
         data.forEach(item => {
           newData.push({id: item.id, tag: item.data().tag})
         })
         setTags(newData)
        setLoading(false)
       })
  },[])

  useEffect(() => {
    const data = restaurants.filter(item => {
      if(item.tags){
       const find = item.tags.find(item => item.tag == tagsActive[0])
       if(find){
         console.log('find')
         return item
       }
      }
    })
    setFilterData(data)
    console.log('filter-re-render',filterData)

  }, [tagsActive])

  console.log('filter',filterData)
  console.log('acttive', tagsActive)
  if(loading) return (<GroupTags/>)

  return (
    <View style={[container]}>
       {/* <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        /> */}
      <View style={styles.tagContainer}>
      {
        tags.map(item => {
          if(item.tag.includes(tagsActive)){
           return <Tag key={item.id} item={item} active tagsActive={tagsActive} setTagsActive={setTagsActive}/>
          }else{
           return <Tag key={item.id} item={item} tagsActive={tagsActive} setTagsActive={setTagsActive}/>

          }
        })
      }
      </View>
      <View>
      <FlatList
            data={filterData}
            renderItem={({item}) => (
              <ItemView item={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})