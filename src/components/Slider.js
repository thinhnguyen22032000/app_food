import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';

const carouselItems = [
    {
        source: require('../assets/banner/banner1.jpg'),
        text: "Text 1",
    },
    {
        source: require('../assets/banner/banner2.jpg'),
        text: "Text 2",
    },
    {
        source: require('../assets/banner/banner3.jpg'),
        text: "Text 2",
    },
   
  ]
  const windowWidth = Dimensions.get('window').width;

 function _renderItem({item,index}){
    return (
      <View style={{
          backgroundColor:'floralwhite',
          borderRadius: 5,
          height: 150,
         }}>
       <Image style={{width: '100%'}} source={item.source}/>
      </View>

    )
    }

const Slider = () => {
  return (
    <View style={{flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  autoplay={true}
                  loop={true}
                  layout={"default"}
                  data={carouselItems}
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth}
                  renderItem={_renderItem}
                  onSnapToItem={() => 0} />
            </View>
  )
}

export default Slider

const styles = StyleSheet.create({})