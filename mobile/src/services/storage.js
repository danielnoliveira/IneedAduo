
import {AsyncStorage} from 'react-native';
const _storeData = async (id) => {
    try {
      await AsyncStorage.setItem('id', id);
    } catch (error) {
      // Error saving data
    }
  };
const _retrieveData = async () => {
    let value = await AsyncStorage.getItem('id');
    return value;
};
module.exports = {
    _storeData,_retrieveData
}