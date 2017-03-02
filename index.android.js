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
// import SearchBar from './src/Components/SearchBar';

// import SearchBar from './src/components/SearchBar';
import NavItem from './src/components/NavItem';
import BookList from './src/components/BookList';
import Button from './src/components/Button';

export default class EZTextbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Home",
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
      if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
      }
      return false;
    });
  }

  openDrawer() {
    this.refs['Drawer'].openDrawer();
  }

  renderScene(route, navigator) {
    var drawer;
    const navOptions = [
      {
        id: "Home",
        name: "Home"
      },
      {
        id: "Selling",
        name: "Books for Sale"
      },
      {
        id: "Buying",
        name: "Books Wanted"
      },
      {
        id: "Search",
        name: "Search Textbooks"
      },
      {
        id: "Logout",
        name: "Logout"
      }
    ];
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

    if (route.id === "Home") {
      scene = <Home />
    }
    else if (route.id === "Search") {
      scene = <Search navigator={navigator} />
    }
    else if (route.id === "Post") {
      scene = <Post {...route.props} />
    }

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
          <ToolbarAndroid
            navIcon={require('./img/menu.png')}
            ref={"Drawer"}
            onIconClicked={this.openDrawer}
            style={styles.toolbar}
            title="EZTextbook"
          />
          <View style={styles.container}>
            {scene}
          </View>
      </DrawerLayoutAndroid>
    );
  }

  render() {

    return (
      <Navigator
        initialRoute={{ id: 0 }}
        ref={(nav) => { navigator = nav; }}
        renderScene={this.renderScene}
        // configureScene={() => ({ ...Navigator.SceneConfigs.FloatFromBottom, gestures: {}})}
      />
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
