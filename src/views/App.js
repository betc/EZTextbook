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

import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import Post from './Post';
import Search from './Search';
import Login from './Login';
import SellBuy from './SellBuy';
import ViewPost from './ViewPost';
import ViewPosts from './ViewPosts';
import BarcodeScanner from './BarcodeScanner';

import NavOptions from '../constants/NavOptions';
import NavItem from '../components/NavItem';

import ApiUtils from '../ApiUtils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Profile',
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
      if (this.refs.navigator && this.refs.navigator.getCurrentRoutes().length > 1) {
          this.refs.navigator.pop();
          return true;
      }
      return false;
    });
  }

  renderScene(route, navigator) {
    let scene = <Home />;
    switch(route.id) {
      case 'Profile':
        scene = <Profile />;
        break;
      case 'Selling':
        scene = <SellBuy type='Selling' navigator={navigator} />;
        break;
      case 'Buying':
        scene = <SellBuy type='Buying' navigator={navigator} />;
        break;
      case 'Search':
        scene = <Search navigator={navigator} />;
      case 'Post':
        scene = <Post {...route.props} />;
      case 'ViewPosts':
        scene = <ViewPosts {...route.props} />;
        break;
      case 'ViewPost':
        scene = <ViewPost {...route.props} />;
        break;
      case 'Logout':
        ApiUtils.removeToken('Login_Token');
        // route.id = 0;
        scene = <Home navigator={navigator} />;
        break;
      case 'BarcodeScanner':
        scene = <BarcodeScanner navigator={navigator} />
        break;
      default:
        scene = <Profile />;
        break;
    }

    return (
      <View style={styles.container}>
        {scene}
      </View>
    );
  }

  render() {
    let navigationButtons = NavOptions.map((item) =>
      <NavItem
        key={item.id}
        title={item.name}
        onPress={() => {
          this.setState({view: item.id});
          this.refs.drawer.closeDrawer();
          if (item.id === 'Logout') {
            this.props.entrance.resetTo({id: item.id});
          }
          else {
            routes = this.refs.navigator.getCurrentRoutes();
            current = routes[routes.length-1];
            if (current.id !== item.id) {
              this.refs.navigator.push({id: item.id});
            }
          }
        }}
      />
    );
    let navigationView = (
      <View style={{flex: 3, backgroundColor: '#262626'}}>
        <Text style={styles.header}>{this.state.userName}</Text>
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
            navIcon={require('../../img/menu.png')}
            onIconClicked={() => this.refs.drawer.openDrawer()}
            style={styles.toolbar}
            title={this.state.view}
          />
          <View style={styles.container}>
            <Navigator
              initialRoute={{ id: 'Home' }}
              ref='navigator'
              renderScene={this.renderScene}
            />
          </View>
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
