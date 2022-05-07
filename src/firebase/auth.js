
import {auth, firestore} from './config';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '950153550731-hfrc7tlcbb28f6anuqke35qvaeadls29.apps.googleusercontent.com',
//   androidClientId: '950153550731-m164ggb9u4hjgg938rbnjivl6ukkggic.apps.googleusercontent.com',
// })


export const register = async (email, password) => {
  
  try {
   const response = await auth().createUserWithEmailAndPassword(email, password)
   firestore().collection('users').add({
     uid: response.user.uid,
     order: [] 
   })
   .then(data => console.log(data))
   .catch(e => console.log(e))
  } catch (error) {
    console.log(error)
  }
         
};

export const login = async (email, password) => {
  try {
    
    await auth().signInWithEmailAndPassword(email, password)    
  } catch (error) {
    console.log(error)
  }
}


export const loginWidthGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error)
    }
}

