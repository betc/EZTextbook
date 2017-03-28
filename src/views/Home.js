import React, { Component, PropTypes } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Home extends Component {
  constructor(props) {
      super(props);
  }

  register() {
    this.props.navigator.push({id: "Register"});
  }
  login() {
    this.props.navigator.push({id: "Login"});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome</Text>
        <Image
          source={require('../../img/EZTextbook.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.text}>Made Textbook Exchange Easy!</Text>
        <Image
          source={require('../../img/Logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.button} onPress={this.register.bind(this)}>
          <Text style={styles.buttonText}>
            Sign up for an account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.login.bind(this)}>
          <Text style={styles.buttonText}>
            Log in to EZTextbook
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    alignSelf: 'center',
    color: '#8073B9',
    marginTop: 20
  },
  imageStyle: {
    marginTop: 15,
    height: 60,
    width: 300,
    borderWidth: 4,
    borderColor: '#F5FCFF'
  },
  text: {
    fontFamily: 'Cochin',
    fontSize: 18,
    fontWeight: "800",
    alignSelf: 'center',
    color: '#8073B9',
    marginTop: 10,
    marginBottom: 30
  },
  button: {
    height: 50,
    width: 270,
    marginTop: 40,
    borderWidth: 2,
    backgroundColor: '#4C70BA',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3B5998'
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  bottomText: {
    marginTop: 50,
    alignSelf: 'center'
  },
  facebook: {
    marginTop: 25,
    alignItems: 'center'
  },
  logo: {
    height: 60,
    width: 100
  }
});
export default Home
