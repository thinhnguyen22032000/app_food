import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React, {useState} from 'react';
import InputCustom from '../components/Input';
import {login, register} from '../firebase/auth';
import {colors} from '../styleVariable';
import ButtonCustom from '../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { sizeIcon } from '../styleVariable';

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [err, setErr] = useState(null);
  const [errNotify, setErrNotify] = useState(null);

  const {ICON_INPUT} = sizeIcon

  const handleRegister = () => {
    // Kiểm tra đầu vào
    if (email !== '' && password !== '' && passwordConfirm !== '') {
      if (password === passwordConfirm) {
        register(email, password, passwordConfirm) // đăng kí tài khoản
          .then(() => {
            login(email, password) // đăng nhập
              .then(() => {
                navigation.navigate('Landing');
              })
              .catch(err => {
                setNotify('Vui lòng kiểm tra thông tin đăng nhập');
              });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setErrNotify('Email này đã được sử dụng');
              console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              setErrNotify('Email không hợp lệ');
              console.log('That email address is invalid!');
            }
          });
      } else {
        setErrNotify('Kiểm tra lại mật khẩu');
      }
    } else {
      setErr('Vui lòng điền đủ thông tin');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View  style={styles.container}>
        <Image style={styles.image} source={require('../assets/avatar.jpg')} />
        {errNotify ? (
          <Text style={{color: colors.prymary_color, margin: 20, fontSize: 16}}>
            {errNotify}
          </Text>
        ) : null}
        <View style={styles.inputView}>
          <InputCustom
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            errorMessage={err}
            leftIcon={<AntDesign name='mail' size={ICON_INPUT}/>}
          />
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
        <View style={styles.inputView}>
          <InputCustom
            placeholder="Mật khẩu"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            errorMessage={err}
            leftIcon={<AntDesign name='lock' size={ICON_INPUT}/>}
          />
        </View>
        <ButtonCustom width={'80%'} title="Đăng kí" onPress={handleRegister} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  registerView: {
    marginTop: 20,
  },
  registerTxt: {
    color: colors.prymary_color,
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
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
