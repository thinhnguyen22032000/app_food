import React, {createContext, useEffect, useState} from 'react';
import {firestore} from '../firebase/config';
import {calcDistancePositionString} from '../map/mapBoxAPI';
import axios from 'axios';
import {auth} from '../firebase/config';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [position, setPosition] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantError, setRestaurantError] = useState([]);
  const [authCache, setAuthCache] = useState({email: ''});
  const [cart, setCart] = useState([])


  function loadCart(){
    if(!userInfo) return
    setTimeout(() => {
      firestore().collection('users').where('uid', '==', userInfo?.uid).get()
     .then(data => {
       const cartInfo = data._docs[0]._data
       setCart({...cartInfo, id: data._docs[0].id})
     })
     .catch(e => console.log(e))
   }, 1000)
  }


  useEffect(() => {
    const subscriber = firestore()
    .collection('users')
    .doc(cart?.uid)
    .onSnapshot(documentSnapshot => {
       loadCart()
    });
  return () => subscriber(); 
  }, [userInfo])

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        setRestaurants([]);
        setUserInfo(null);
        setPosition(null);
      })
      .catch(err => console.log(err));
  };


  const loadRestaurants = () => {
    firestore()
      .collection('restaurants')
      .get()
      .then(data => {
        let restaurantError = [];
        let newRes = [];
        let lengthRes = 0;
        let length = data.size - 1;
        data.forEach(doc => {
          currentDistance(doc.data().lang, doc.data().lat)
            .then(data => {
              if (data) {
                newRes.push({
                  ...doc.data(),
                  id: doc.id,
                  distance: data.data.routes[0].distance,
                  duration: data.data.routes[0].duration,
                });
                lengthRes++;
              } else {
                restaurantError.push({
                  ...doc.data(),
                  id: doc.id,
                });
                lengthRes++;
              }

              if (lengthRes == length) {
                setRestaurants([...newRes]);
                setRestaurantError(restaurantError);
              }
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('restaurants')
      .onSnapshot(documentSnapshot => {
        if (position) {
          loadRestaurants();
        }
      });
    return () => subscriber();
  }, [position]);
  // calc distance to user location
  const currentDistance = async (longitude, latitude) => {
    const str = calcDistancePositionString(
      position.longitude,
      position.latitude,
      longitude,
      latitude,
    );
    try {
      const distance = await axios.get(str);
      return distance;
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    cart,
    setCart,
    authCache,
    setAuthCache,
    restaurantError,
    currentDistance,
    userInfo,
    setUserInfo,
    position,
    setPosition,
    restaurants,
    setRestaurants,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export {UserContext};
