import { AsyncStorage } from 'react-native';

const BASE = 'https://eztextbook.herokuapp.com';

var ApiUtils = {
  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },
  async setToken(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("ApiUtils.setToken, error: " + error);
      throw("ApiUtils.setToken error: " + error);
    }
  },
  async getToken(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null){
        // We have data!!
        console.log('apiutils.getToken token: ', value);
        return value;
      }
    } catch (error) {
      console.log("ApiUtils.getToken, error: " + error);
      throw("ApiUtils.getToken error: " + error);
    }
  },
  async removeToken(key) {
    try {
      const value = await AsyncStorage.removeItem(key);

    } catch (error) {
      console.log("ApiUtils.removeToken, error: " + error);
      throw("ApiUtils.removeToken error: " + error);
    }
  }
};

export { ApiUtils as default };
