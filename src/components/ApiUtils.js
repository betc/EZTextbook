// ApiUtils.js
import { AsyncStorage} from 'react-native';

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
  getLoginToken:  function() {
    // Method 1: returns undefined
        var retval;
 /*       AsyncStorage.getItem('Login_Token')
        .then((keyValue) => {
            console.log("in ApiUtils. value = " + keyValue);
            retval =  keyValue;
        },
     (error) => { console.log("in ApiUtils, error: " + error);
        retval = null;
    });
    return retval; */
    //Method 2
     try{
        retval = AsyncStorage.getItem('Login_Token');

        console.log("in ApiUtils.js. value = " + retval._65);
     } catch(error) {
        console.log("in ApiUtils.js, error : " +error)
        return null;
     };
     return retval;


  }

};
export { ApiUtils as default };