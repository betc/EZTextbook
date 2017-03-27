import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
 
import Icon from 'react-native-vector-icons/FontAwesome';
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
            ApiUtils.setToken('Login_Token', responseJson.token);
            ApiUtils.getToken('Login_Token').then((value) =>
              { console.log("Login_Token set to : " + value)}
            );
            this.props.navigator.resetTo({id: 'App'});
        })
        .catch((error) => {
             //   this.setState({errMsg: 'ERROR: Incorrect Email or Password'});
                alert('ERROR: Incorrect Email or Password');
                console.log(error);
        })
        .done();

    }

	render() {
		return (
			<View style={styles.container}>
					<View style={styles.content}>
						<Text style={styles.logo}>Login To EZTextbook</Text>
						<Text style={styles.error}>{this.state.errMsg}</Text>
					    <View style={styles.inputContainer}>
							<TextInput underlineColorAndroid='transparent' style={styles.input}
							    onChangeText={(email) => this.setState({email: email.trim()})}
								value={this.state.email} placeholder='email'>
							</TextInput>
							<TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
								onChangeText={(password) => this.setState({password})}
								value={this.state.password} placeholder='password'>
							</TextInput>
						</View>
						<TouchableOpacity
						    onPress={this.login}
						    style={styles.buttonContainer}>
							<Text style={styles.buttonText}>LOGIN</Text>
						</TouchableOpacity>
					</View>
			</View>
		);
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
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
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: '#fff',
		backgroundColor: 'rgba(255,255,255,0.2)',
	},
	input: {
	    height: 50,
	    width: 300,
        marginTop: 8,
        padding: 5,
        fontSize: 18,
        borderWidth: 1.2,
        borderColor: '#48bbec',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
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
	} 
});
