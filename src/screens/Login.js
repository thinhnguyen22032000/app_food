import {
  StyleSheet,
  Text,
  View,
 } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import { login, loginWidthGoogle } from '../firebase/auth';
import { auth } from '../firebase/config';
import InputCustom from '../components/Input'
import ButtonCustom from '../components/Button';
import { colors } from '../styleVariable';
import { UserContext } from '../contexts/userContext';
import { Button, Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { sizeIcon } from '../styleVariable';
import Logo from '../share/Logo'
import LottieView from 'lottie-react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: "950153550731-hfrc7tlcbb28f6anuqke35qvaeadls29.apps.googleusercontent.com"
});


export default function Login({navigation}) {
  const {position, userInfo, authCache, setAuthCache} = useContext(UserContext)

  const {ICON_INPUT} = sizeIcon
  const [email, setEmail] = useState(authCache.email);
  const [password, setPassword] = useState('');
  const [notify, setNotify] = useState('')
  const [err, setErr] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleFocusInput = () => {
    setErr('')
  }
  console.log('authCache',authCache)
  const signIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const res = await auth().signInWithCredential(googleCredential);
  console.log(res)
    } catch (error) {
     console.log(error)

      
    }
  };
  useEffect(() => {
   let isMounted = true
   setLoading(false)
   setTimeout(() => {
    if(isMounted) {
      if(userInfo) {
        console.log(typeof userInfo)
        console.log('chuyển landing')
        return  navigation.navigate('Landing')
      }
    }
   }, 1000)
   return () => isMounted = false
  }, [])

  const handleLogin = () => {
    if(email !== '' && password !== ''){
      setLoading(true)
      login(email.trim(), password.trim())
      .then(() => {
        setAuthCache({email: email})
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
      <View>
        <Logo/>
      </View>
      <LottieView
      style={{width: 200,height: 200}}
      source={require('../assets/lotties/login_eat.json')}
      autoPlay
      />
      {notify? (<Text style={{color: colors.prymary_color, margin: 20, fontSize: 16}}>{notify}</Text>): null}
      <View style={styles.inputView}>
      <InputCustom onfocus={handleFocusInput} placeholder="Email" leftIcon={<AntDesign name='mail' size={ICON_INPUT}/>} value={email} errorMessage={err} onChangeText={setEmail} />
      </View>
 
      <View style={styles.inputView}>
      <InputCustom
        secureTextEntry={true}
        onfocus={handleFocusInput}
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
      <Button title={'google sign'} onPress={signIn}/>
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
