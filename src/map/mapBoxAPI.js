import axios from "axios";

const ACCESS_TOKEN ='pk.eyJ1IjoibnRoaW5oIiwiYSI6ImNsMDNicnpibjA0bXgzanIxOXN6Yng1Y3UifQ.HUIKfQctfGMttTdhxcI6aA';

// return current positon
export const getCurrentPositionString = (longitude, latitude) => {

  return  `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${ACCESS_TOKEN}`
  
}

export const calcDistancePositionString = (longitude1, latitude1, longitude2, latitude2) => {
  return `https://api.mapbox.com/directions/v5/mapbox/driving/${longitude1},${latitude1};${longitude2},${latitude2}?access_token=${ACCESS_TOKEN}`
}