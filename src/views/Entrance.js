import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
} from 'react-native';

import App from './App';
import Home from './Home';
import Register from './Register';
import Login from './Login';

import ApiUtils from '../ApiUtils';

export default class Entrance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }

  componentWillMount () {
    // get username from profile
    ApiUtils.getToken('userName').then((res) => {
      this.setState({
        userName: res
      });
    })
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.refs.entrance && this.refs.entrance.getCurrentRoutes().length > 1) {
          this.refs.entrance.pop();
          return true;
      }
      return false;
    });
  }

  renderScene(route, navigator) {
    switch(route.id) {
      case 'App':
        return <App entrance={navigator} />;
      case 'Register':
        return <Register navigator={navigator} />;
      case 'Login':
        return <Login navigator={navigator} />;
      case 'Home':
        return <Home navigator={navigator} />;
      default:
        if (this.state.userName === '') {
          return <Home navigator={navigator} />;
        }
        else {
          return <App entrance={navigator} />;
        }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{ id: 'Home' }}
          ref='entrance'
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
