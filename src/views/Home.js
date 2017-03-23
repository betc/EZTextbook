import React, { Component, PropTypes } from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class Home extends Component {
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
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>
            Sign up for an account
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>
            Log in to EZTextbook
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.facebook}>
          <Image
            source={require('../../img/facebook.png')}
            style={styles.imageStyle}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
