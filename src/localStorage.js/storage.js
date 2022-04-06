import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITEM_SEARCH } from './key';

const setData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(ITEM_SEARCH, jsonValue)
    } catch (e) {
       console.log(e)
    }
}

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(ITEM_SEARCH)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e)
    }
}

export {
    setData,
    getData,
}