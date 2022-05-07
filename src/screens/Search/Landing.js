import { StyleSheet, Text, View, BackHandler, Platform, PermissionsAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import Geolocation from 'react-native-geolocation-service';
import LottieView from 'lottie-react-native';
import ButtonCustom from '../../components/Button';
import { Overlay } from 'react-native-elements';

const Landing = ({navigation}) => {
  const {setPosition, position} = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  const nativeApiGetLocation = async () => {
    // setLoading(true)
    // console.log('lat gps')
    // Geolocation.getCurrentPosition(position => {
    //   // setLoading(false)
    //   setPosition({
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //   });
      
    // }, () => setLoading(false));
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }
  console.log(position)
  useEffect(() => {
    let isMounted = true
    if(isMounted){
      nativeApiGetLocation()
    }
    return () => isMounted = false
  }, [])
  return (
    <View style={styles.container}>
      {/* <Overlay isVisible={loading}>
        <Text>Đang xử lý...</Text>
       </Overlay> */}
      <LottieView
      style={{width: 300,height: 300}}
      source={require('../../assets/lotties/food_landing.json')}
      autoPlay
      />
      <View style={styles.txt_container}>
        <Text>Chào mừng bạn đến với spfood</Text>
        <Text>Vui lòng bật định vị để sử dụng dịch vụ của chúng tôi</Text>
      </View>
      <View style={styles.btn_container}>
        <View style={styles.btn_group}>
        <ButtonCustom title={'Bật định vị của bạn'} onPress={nativeApiGetLocation}/>
        </View>
        <View style={styles.btn_group}>
        <ButtonCustom title={'Thoát dứng dụng'} bgColor={'black'} onPress={() => BackHandler.exitApp()}/>
        </View>
      </View>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
  container: {
     alignItems: 'center',
     flex: 1,
  },
  txt_container: {
    alignItems: 'center'
  },
  btn_container:{
    flex: 1,
    width: '90%',
    justifyContent: 'flex-end',
    marginBottom: 20,
  
  },
  btn_group: {
     marginTop: 5,
     marginBottom: 5,
  }
})