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

export default class Entrance extends Component {
  componentWillMount () {
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
        return <Home navigator={navigator} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{ id: 'Home' }}
          ref='entrance'
          renderScene={this.renderScene}
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
