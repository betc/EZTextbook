import React, { Component, PropTypes } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

export default class Home extends Component {
/*
    const value = await AsyncStorage.getItem('Login_Token')

    constructor(props) {
        super(props);
        this.state = {
         token: ""
        };
    }*/
  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    )
  }
}
