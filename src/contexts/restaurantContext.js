import React, {createContext, useState} from 'react';
import {firestore} from '../firebase/config';
import {calcDistancePositionString} from '../map/mapBoxAPI';
import axios from 'axios';

const RestaurantContext = createContext();

export const RestaurantProvider = ({children}) => {
  const [restaurants, setRestaurants] = useState([]);
  const loadRestaurants = () => {
    firestore()
      .collection('restaurants')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let newRes = [];
        querySnapshot.forEach(documentSnapshot => {
          currentDistance(
            documentSnapshot.data().lang,
            documentSnapshot.data().lat,
          ).then(data => {
            // console.log(data.data.routes[0])
            newRes.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
              distance: data.data.routes[0].distance,
              duration: data.data.routes[0].duration,
            });
          });
        });
        setRestaurants(newRes);
      });
  };
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
    restaurants,
    setRestaurants,
    loadRestaurants,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
export {RestaurantContext};
