import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import FormField from '../components/FormField';
import { H3 } from '../components/Headings';
import { ButtonSubmit } from '../components/Buttons';

import ApiUtils from '../ApiUtils';
import Profile from './Profile';
// import { setToken } from '../ApiUtils';

//import FbLoginButton from '../components/FbLoginButton';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      LoginToken: ''
    };
  }

  login = () => {
    fetch('https://eztextbook.herokuapp.com/api/auth/login/local' , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email.trim(),
        password: this.state.password,
      })
    })
    .then(ApiUtils.checkStatus)
    .then((response) => response.json())
    .then((responseJson) => {
      ApiUtils.setToken('Login_Token', responseJson.token).then((value => {
        this.props.trigger();
        this.props.navigator.resetTo({id: 'Profile'});
      }));
      // ApiUtils.getToken('Login_Token').then((value) =>
      //   { console.log("Login_Token set to : " + value)}
      // );
    })
    .catch((error) => {
      //   this.setState({errMsg: 'ERROR: Incorrect Email or Password'});
      alert('ERROR: Incorrect Email or Password');
      console.log(error);
    })
    .done();

  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.errMsg}</Text>
        <Image
          source={require('../../img/AppLogo2.png')}
          style={{width: 324, height: 96}}
        />
        <FormField
          style={styles.input}
          underlineColorAndroid='transparent'
          onChangeText={(email) => this.setState({email: email.trim()})}
          value={this.state.email}
          placeholder='Email' />
        <FormField
          style={styles.input}
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder='Password' />
        <ButtonSubmit title='Login' onPress={this.login} style={{marginTop: 30}}/>
        <TouchableOpacity
			    onPress={this.goBack.bind(this)}>
			    <Text style={styles.back}>Back</Text>
				</TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: "800",
    alignSelf: 'center',
    color: '#8073B9',
    marginTop: 20
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    marginTop: 50,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 15,
    height: 50,
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#9B9B9B',
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15
  },
  buttonContainer: {
    height: 50,
    width: 300,
    backgroundColor: '#48BBEC',
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  error: {
    fontSize: 20,
    color: 'red'
  }, 
  back: {
    fontSize: 15,
    marginTop: 50,
    alignSelf: 'center',
  }
});
