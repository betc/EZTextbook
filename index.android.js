/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  View,
  Navigator,
  BackAndroid,
  AsyncStorage
} from 'react-native';

import Home from './src/views/Home';
import Profile from './src/views/Profile';
import Register from './src/views/Register';
import Post from './src/views/Post';
import Search from './src/views/Search';
import Login from './src/views/Login';
import SellBuy from './src/views/SellBuy';
import ViewPost from './src/views/ViewPost';
import ViewPosts from './src/views/ViewPosts';

import navOptions from './src/components/NavOptions';
import NavItem from './src/components/NavItem';
import BookList from './src/components/BookList';
import Button from './src/components/Button';

import { setLoginToken } from './src/ApiUtils';

export default class EZTextbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login_Token: 'none',
      courses: [],
    };
  }

  componentDidMount () {
    // TO DO
    // fetch('https://api.uwaterloo.ca/v2/courses/CS.json?key=c687ee7c8cc53db208f2a34776316cb0')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.state.courses = responseJson.data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // var navigator;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.refs.navigator && this.refs.navigator.getCurrentRoutes().length > 1) {
          this.refs.navigator.pop();
          return true;
      }
      return false;
    });

    // setLoginToken('Login_Token', 'abc');
  }


  // async getLoginToken() {

  //   //try {
  //       let value = await AsyncStorage.getItem('Login_Token')
  //     //  if (value !== null) {
  //           console.log("getLoginToken successful: value = " + value);
  //     //  }
  //   //} catch(error) {
  //       console.log("Error occurred in getLoginToken: " + error);
  //   //}
  //   return value;
  // }

  renderScene(route, navigator) {

    let scene = <Home navigator={navigator} />;

    if (route.id === 'Profile') {
      scene = <Profile />
    } else if (route.id === 'Register') {
      scene = <Register navigator={navigator} />
    }
    else if (route.id === 'Selling') {
      scene = <SellBuy type='Selling' navigator={navigator} />
    }
    else if (route.id === 'Buying') {
      scene = <SellBuy type='Buying' navigator={navigator} />
    }
    else if (route.id === 'Search') {
      scene = <Search navigator={navigator} />
    }
    else if (route.id === 'Post') {
      scene = <Post {...route.props} />
    }
    else if (route.id === 'ViewPosts') {
      scene = <ViewPosts {...route.props} />
    }
    else if (route.id === 'ViewPost') {
      scene = <ViewPost {...route.props} />
    }
    else if (route.id === 'Login') {
      scene = <Login navigator={navigator} />
    }
    else if (route.id === 'Logout') {
        AsyncStorage.removeItem('Login_Token')
        scene = <Login navigator={navigator} />
    }

    return (
      <View style={styles.container}>
        {scene}
      </View>
    );
  }

  render() {
    let navigationButtons = navOptions.map((item) =>
      <NavItem
        key={item.id}
        title={item.name}
        onPress={() => {this.refs.drawer.closeDrawer(); this.refs.navigator.push({id: item.id})}}
      />
    );
    let navigationView = (
      <View style={{flex: 3, backgroundColor: '#262626'}}>
        <Text style={styles.header}>John Doe</Text>
        {navigationButtons}
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref='drawer'
        renderNavigationView={() => navigationView}>
          <ToolbarAndroid
            navIcon={require('./img/menu.png')}
            onIconClicked={() => this.refs.drawer.openDrawer()}
            style={styles.toolbar}
            title='EZTextbook'
          />
          <Navigator
            initialRoute={{ id: 0 }}
            // ref={(nav) => { navigator = nav; }}
            ref='navigator'
            renderScene={this.renderScene}
            // configureScene={() => ({ ...Navigator.SceneConfigs.FloatFromBottom, gestures: {}})}
          />
      </DrawerLayoutAndroid>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  toolbar: {
    backgroundColor: '#ffcc00',
    height: 56,
  },
  button: {
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 15,
  },
  header: {
    color: '#e6e6e6',
    fontSize: 25,
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#4d4d4d',
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('EZTextbook', () => EZTextbook);
