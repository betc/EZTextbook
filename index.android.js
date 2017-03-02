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
  View
} from 'react-native';

import NavItem from './NavItem';
import Post from './Post';
import Home from './Home';

import Header from './src/components/Header';
// import SearchBar from './src/components/SearchBar';
import Search from './src/components/Search';
import BookList from './src/components/BookList';
import Button from './src/components/Button';

var nativeImageSource = require('nativeImageSource');

export default class EZTextbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Home",
      courses: [],
    };
  }
  // var scene = <Home />;
  //
  // handleView(view) {
  //   this.state.view = view;
  //   if (this.state.view === "Home") {
  //     this.scene = <Home />;
  //   }
  //   else if if (this.state.view === "Home") {
  //     this.scene = <Post />;
  //   }
  // }

  componentDidMount () {
    fetch('https://api.uwaterloo.ca/v2/courses/CS.json?key=c687ee7c8cc53db208f2a34776316cb0')
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.courses = responseJson.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const navOptions = ["Home", "Find Textbooks", "Make a Post"];
    const navigationButtons = navOptions.map((title) =>
      <NavItem key={title} title={title} />
    );
    var navigationView = (
      <View style={{flex: 3, backgroundColor: '#fff'}}>
        {navigationButtons}
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={() => navigationView}>
          <ToolbarAndroid
            navIcon={require('./img/menu.png')}
            onIconClicked={() => this.drawer.openDrawer()}
            style={styles.toolbar}
            title="EZTextbook"
          />
          <View style={{ flex: 1 }}>
            <Header headerText={'Search Books'} />
            <Search />
          </View>
      </DrawerLayoutAndroid>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  },
  button: {
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 15,
  }
});

AppRegistry.registerComponent('EZTextbook', () => EZTextbook);
