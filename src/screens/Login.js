import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,} from 'react-native';
import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import { login } from '../firebase/auth';
import InputCustom from '../components/Input'
import ButtonCustom from '../components/Button';
import { colors } from '../styleVariable';
import { UserContext } from '../contexts/userContext';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { sizeIcon } from '../styleVariable';

export default function Login({navigation}) {
  const {ICON_INPUT} = sizeIcon
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotify] = useState('')
  const [err, setErr] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const {position, userInfo} = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  const handleFocusInput = () => {
    setErr('')
  }

  useEffect(() => {
   setTimeout(() => {
    setLoading(false)
    if(userInfo) {
      console.log(userInfo)
      console.log('chuyển landing')
      return  navigation.navigate('Landing')
    }
   }, 3000)
  }, [])

  const handleLogin = () => {
    if(email !== '' && password !== ''){
      setLoading(true)
      login(email, password)
      .then(() => {
        setLoading(false)
         navigation.navigate('Landing') 
      })
      .catch(err => {
        setLoading(false)
        setNotify("Vui lòng kiểm tra thông tin đăng nhập")
      })
    }else{
      setErr('Vui lòng nhập đủ thông tin')
    }
  }

  return (
    <View style={styles.container}>
       <Overlay isVisible={loading}>
        <Text>Đang xử lý...</Text>
       </Overlay>
      <Image style={styles.image} source={require("../assets/avatar.jpg")} />
      {notify? (<Text style={{color: colors.prymary_color, margin: 20, fontSize: 16}}>{notify}</Text>): null}
      <View style={styles.inputView}>
      <InputCustom onfocus={handleFocusInput} placeholder="Email" leftIcon={<AntDesign name='mail' size={ICON_INPUT}/>} value={email} errorMessage={err} onChangeText={setEmail} />
      </View>
 
      <View style={styles.inputView}>
      <InputCustom
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        errorMessage={err}
        leftIcon={<AntDesign name='lock' size={ICON_INPUT}/>}
      />
      </View>
      <ButtonCustom width={'80%'} title="Đăng nhập" onPress={handleLogin}  />
      <View style={styles.registerView}>
        <Text>Bạn chưa có tài khoản?. <Text style={styles.registerTxt} onPress={()=>{navigation.navigate('register')}}>Đăng ký</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  registerView:{
      marginTop: 20
  },
  registerTxt:{
    color: colors.prymary_color
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },

})
