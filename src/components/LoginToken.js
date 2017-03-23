// LoginToken.js
import { AsyncStorage } from 'react-native';

var LoginToken = function() {
        AsyncStorage.getItem('Login_Token')
        .then((keyValue) => {
            console.log("in index.android.js. value = " + keyValue)
            return keyValue;
        }, (error) => { console.log(error) });
        return null;
        }

};

export default LoginToken;