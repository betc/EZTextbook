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
  Navigator
} from 'react-native';

import Home from './src/views/Home';
import Post from './src/views/Post';
//import Search from './src/views/Search';
import SearchBar from './src/Components/SearchBar';

// import SearchBar from './src/components/SearchBar';
import NavItem from './src/components/NavItem';
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

  renderScene(route, navigator) {
    const navOptions = [
      {
        id: 0,
        name: "Home"
      },
      {
        id: 1,
        name: "Books for Sale"
      },
      {
        id: 2,
        name: "Books Wanted"
      },
      {
        id: 3,
        name: "Search Textbooks"
      },
      {
        id: 4,
        name: "Make a Post"
      }];
    let navigationButtons = navOptions.map((item) =>
      <NavItem
        key={item.id}
        title={item.name}
        onPress={() => navigator.push({id: item.id})} />
    );
    let navigationView = (
      <View style={{flex: 3, backgroundColor: '#262626'}}>
        <Text style={styles.header}>John Doe</Text>
        {navigationButtons}
      </View>
    );

    let scene = <Home />

    if (route.id === 0) {
      scene = <Home />
    }
    else if (route.id === 3) {
      scene = <SearchBar />
    }

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
          <ToolbarAndroid
            navIcon={require('./img/menu.png')}
            // ref={(drawer) => { this.drawer = drawer; }}
            onIconClicked={() => this.drawer.openDrawer()}
            style={styles.toolbar}
            title="EZTextbook"
          />
          {scene}
      </DrawerLayoutAndroid>
    );
  }

  render() {

    return (
      <Navigator
        initialRoute={{ id: 0 }}
        renderScene={this.renderScene}
      />
    );
  };
}

const styles = StyleSheet.create({
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
    color: "#e6e6e6",
    fontSize: 25,
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#4d4d4d",
    textAlign: "center",
  }
});

AppRegistry.registerComponent('EZTextbook', () => EZTextbook);
