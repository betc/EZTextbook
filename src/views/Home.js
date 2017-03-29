import React, { Component, PropTypes } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { Button } from '../components/Buttons';

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
    var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Image
          source={require('../../img/AppLogo2.png')}
          style={{width: 324, height: 96}}
        />
        <View style={{marginTop: 20}}>
          <Button onPress={this.register.bind(this)}>
            Register
          </Button>
        </View>
        <View style={{marginTop: 20}}>
          <Button onPress={this.login.bind(this)}>
            Login
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
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
    // height: 70,
    // width: 300,
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
