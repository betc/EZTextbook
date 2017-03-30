import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  Alert,
  ScrollView
} from 'react-native';
import FormField from '../components/FormField';
import { H3 } from '../components/Headings';
import { ButtonSubmit } from '../components/Buttons';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    }
  }

  async onRegisterPressed() {
    let errorsArray = [];
    if (this.state.email == "" || this.state.firstName == "" || this.state.lastName == "" || this.state.password == "" || this.state.passwordConfirmation == "") {
      errorsArray.push("Required field must be filled out.");
    }
    if (!this.validateInput(this.state.email, 'email')) {
      errorsArray.push("E-mail address entered is invalid.");
    }
    if (!this.validateInput(this.state.phone, 'phone')) {
      errorsArray.push("Mobile number consists of 10 digits only.");
    }
    if (!this.validateInput(this.state.firstName, 'name')) {
      errorsArray.push("First Name entered is invalid");
    }
    if (!this.validateInput(this.state.lastName, 'name')) {
      errorsArray.push("Last Name entere is invalid");
    }
    if (!this.validateInput(this.state.password, 'password')) {
      errorsArray.push("Password should be at least 6 characters long.");
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      errorsArray.push("Password does not match the confirm password.");
    }
    if (errorsArray.length == 0) {
      return fetch('https://eztextbook.herokuapp.com/api/auth/signup/local', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: this.state.firstName,
        	lastname: this.state.lastName,
          password: this.state.password,
        	email: this.state.email.trim(),
          phone: this.state.phone,
        })
      })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.success == false) {
          alert("Entered e-mail is already in use.");
        } else {
          Alert.alert('Verification has been sent to ' + this.state.email, 'Check your e-mail to finish creating your EZTextbook account.');
          this.props.navigator.replace({id: "Login"});
        }
      })
    } else {
      this.setState({errors: errorsArray});
    }
  }

  validateInput(input, type) {
    const passwordRegex = /^.{6,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const nameRegex = /[A-Za-z][A-Za-z]*/;
    if (type === 'email') {
      return emailRegex.test(input);
    } else if (type === 'phone') {
      return mobileRegex.test(input);
    } else if (type === 'password') {
      return passwordRegex.test(input);
    } else {
      return nameRegex.test(input);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <H3>Email*</H3>
        <FormField
          onChangeText={(val) => this.setState({email: val.trim()})}
          keyboardType={'email-address'}
        />
        <H3>First Name*</H3>
        <FormField
          onChangeText={(val) => this.setState({firstName: val})}
        />
        <H3>Last Name*</H3>
        <FormField
          onChangeText={(val) => this.setState({lastName: val})}
        />
        <H3>Mobile Number*</H3>
        <FormField
         onChangeText={(val) => this.setState({phone: val})}
         keyboardType={'phone-pad'}
       />
       <H3>Password*</H3>
       <FormField
          onChangeText={(val) => this.setState({password: val})}
          secureTextEntry={true}
       />
       <H3>Confirm Password*</H3>
       <FormField
          onChangeText={(val) => this.setState({passwordConfirmation: val})}
          secureTextEntry={true}
       />
        <ButtonSubmit
          title="Submit"
          onPress={this.onRegisterPressed.bind(this)}
          style={{marginTop: 30}}
        />
        <Errors errors={this.state.errors} />
      </ScrollView>
    )
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}>{error}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10
  },
  input: {
    height: 50,
    marginTop: 8,
    padding: 5,
    fontSize: 18,
    borderWidth: 1.2,
    borderColor: '#48bbec',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 15,
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
  heading: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#48BBEC',
    marginBottom: 15
  },
  textStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#e6ccff',
    marginBottom: 20
  },
  error: {
    marginTop: 10,
    alignSelf: 'center',
    color: 'red'
  }
});

export default Register;
