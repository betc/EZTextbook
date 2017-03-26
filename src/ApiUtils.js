// // ApiUtils.js

import {
  AsyncStorage
} from 'react-native';

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
		  console.log('store token');
		  await AsyncStorage.setItem(key, value);
		} catch (error) {
		  console.log(error);
		}
	},
	async getToken(key) {
	  try {
	    const value = await AsyncStorage.getItem(key);
	    if (value !== null){
	      // We have data!!
	      // console.log('apiutils token: ', value);
	      return value;
	    }
	  } catch (error) {
	    console.log(error);
	  }
	}
};

export { ApiUtils as default };

// export async function setToken(key, value) {
// 	try {
// 	  console.log('store token');
// 	  await AsyncStorage.setItem(key, value);
// 	} catch (error) {
// 	  console.log(error);
// 	}
// }

// export async function getToken(key) {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value !== null){
//       // We have data!!
//       console.log(value);
//       return value;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export { setToken, getToken }
