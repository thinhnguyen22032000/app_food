import React, {createContext, useEffect, useState} from 'react';
import { firestore } from '../firebase/config';
import { calcDistancePositionString } from '../map/mapBoxAPI';
import axios from 'axios';
import { auth } from '../firebase/config';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState()
  const [position, setPosition] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const logout = () => {
    auth()
   .signOut()
   .then(() => {
     setRestaurants([])
     setUserInfo(null)
   })
   .catch((err) => console.log(err))
  }

  const loadRestaurants = () => {
    firestore()
      .collection('restaurants')
      .get()
      .then(data => {
        let newRes = [];
        let length = data.size - 1
        data.forEach(doc => {
         currentDistance(doc.data().lang, doc.data().lat)
          .then(data => {
            console.log(newRes.length, '-', length)
            newRes.push({
              ...doc.data(),
              id: doc.id,
              distance: data.data.routes[0].distance,
              duration: data.data.routes[0].duration,
            });
            if(newRes.length == length){
              setRestaurants([...newRes]);
            }
          })
          .catch(err => console.log(err))
        });
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    if(position){
      loadRestaurants() 
      console.log('res', restaurants)
    }
  },[position])
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

  // useEffect(() => {
  //   if(position != null) {

  //     loadRestaurants(setRestaurants)
  //     console.log('load data')
  //   }
  // },[position])

  const value = {
    currentDistance,
   userInfo,
   setUserInfo,
   position,
   setPosition,
   restaurants,
   setRestaurants,
   logout,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
export {UserContext};
