
import {auth} from './config';


export const register = async (email, password) => {
 
  await auth().createUserWithEmailAndPassword(email, password)
         
};

export const login = async (email, password) => {
  await auth().signInWithEmailAndPassword(email, password)    
}
 

