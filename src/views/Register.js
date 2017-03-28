import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  Alert
} from 'react-native';

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

  validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email))
      return true;
    else
      return false;
  }

  validatePhone(mobile) {
    const mobileRegex = /^[0-9]{10}$/;
    if (mobileRegex.test(mobile) || mobile === '')
      return true;
    else
      return false;
  }

  validatePassword(password) {
    const passwordRegex = /^.{6,}$/;
    if (passwordRegex.test(password))
      return true;
    else
      return false;
  }

  async onRegisterPressed() {
    let errorsArray = [];
    if (this.state.email == "" || this.state.firstName == "" || this.state.lastName == "" || this.state.password == "" || this.state.passwordConfirmation == "") {
      errorsArray.push("required field must be filled out");
    }
    if (!this.validateEmail(this.state.email)) {
      errorsArray.push("e-mail address entered is invalid");
    }
    if (!this.validatePhone(this.state.phone)) {
      errorsArray.push("mobile number consists of 10 digits only")
    }
    if (!this.validatePassword(this.state.password)) {
      errorsArray.push("password should be at least 6 characters long");
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      errorsArray.push("password does not match the confirm password");
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
          alert("Entered e-mail is already in use");
        } else {
          Alert.alert('Verification has been sent to ' + this.state.email, 'Check your email to finish creating your EZTextbook account');
          this.props.navigator.push({id: "Login"});
        }
      })
    } else {
      this.setState({errors: errorsArray});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Sign up for your free EZTextbook account
        </Text>
        <Text style={styles.textStyle}>
          The best textbook exchange app ever!
        </Text>
        <TextInput
          onChangeText={(val) => this.setState({email: val.trim()})}
          style={styles.input} placeholder="Email (*required)"
        />
        <TextInput
          onChangeText={(val) => this.setState({firstName: val})}
          style={styles.input} placeholder="First Name (*required)"
        />
        <TextInput
          onChangeText={(val) => this.setState({lastName: val})}
          style={styles.input} placeholder="Last Name (*required)"
        />
        <TextInput
          onChangeText={(val) => this.setState({phone: val})}
          style={styles.input} placeholder="Mobile Number"
        />
        <TextInput
          onChangeText={(val) => this.setState({password: val})}
          style={styles.input} placeholder="Password (*required)"
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={(val) => this.setState({passwordConfirmation: val})}
          style={styles.input} placeholder="Confirm Password (*required)"
          secureTextEntry={true}
        />
        <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
          <Text style={styles.buttonText}>
            Create Account
          </Text>
        </TouchableHighlight>
        <Errors errors={this.state.errors} />
      </View>
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
    marginTop: 20
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
