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
  BackAndroid
} from 'react-native';

import Home from './src/views/Home';
import Post from './src/views/Post';
import Search from './src/views/Search';
import Selling from './src/views/Selling';

import navOptions from './src/components/NavOptions';
import NavItem from './src/components/NavItem';
import BookList from './src/components/BookList';
import Button from './src/components/Button';

export default class EZTextbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  // openDraw() {
  //   this.refs['Drawer'].openDrawer();
  // }

  // getNavigator(){
  //   return this.refs.navigator;
  // }

  renderScene(route, navigator) {
    let scene = <Home />;

    if (route.id === "Home") {
      scene = <Home />
    }
    else if (route.id === "Selling") {
      scene = <Selling />
    }
    else if (route.id === "Search") {
      scene = <Search navigator={navigator} />
    }
    else if (route.id === "Post") {
      scene = <Post {...route.props} />
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
        ref="drawer"
        renderNavigationView={() => navigationView}>
          <ToolbarAndroid
            navIcon={require('./img/menu.png')}
            onIconClicked={() => this.refs.drawer.openDrawer()}
            style={styles.toolbar}
            title="EZTextbook"
          />
          <Navigator
            initialRoute={{ id: 0 }}
            // ref={(nav) => { navigator = nav; }}
            ref="navigator"
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
    backgroundColor: "#fff"
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
