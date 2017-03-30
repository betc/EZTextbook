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
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import Post from './Post';
import Search from './Search';
import Login from './Login';
import ViewPost from './ViewPost';
import ViewPosts from './ViewPosts';
import BarcodeScanner from './BarcodeScanner';

import NavOptions from '../constants/NavOptions';
import NavItem from '../components/NavItem';
import BookList from '../components/BookList';
import Button from '../components/Button';

import ApiUtils from '../ApiUtils';

import Events from 'react-native-simple-events';

export default class App extends Component {
  constructor(props) {
    // console.log('constructor');
    super(props);
    this.state = {
      view: 'Profile',
      userName: '',
      loggedIn: false
    };

    this.triggerLogin = this.triggerLogin.bind(this);
  }

  componentWillMount () {
    // get username from profile
    // console.log('componentWillMount');
    ApiUtils.getToken('userName').then((res) => {
      this.setState({userName: res});
      if (res) {
        this.setState({loggedIn: true});
      }
      return res;
    });
    BackAndroid.addEventListener('hardwareBackPress', (callback) => {
      if (this.refs.navigator && this.refs.navigator.getCurrentRoutes().length > 1) {
        let routes = this.refs.navigator.getCurrentRoutes();
        let current = routes[routes.length-1];
        // ToastAndroid.show(current.id, ToastAndroid.SHORT);
        this.refs.navigator.pop();
        Events.trigger('backPressed', current.id)
        return true;
      }
      return false;
    });
  }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }
  //
  // componentDidMount() {
  //   console.log('componentDidMount');
  // }
  //
  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }
  //
  // shouldComponentUpdate(newProps, newState) {
  //   console.log('shouldComponentUpdate');
  //   // console.log('new props: ',newProps);
  //   console.log('new state: ',newState);
  //   // if (newState.loggedIn) {
  //   //   ApiUtils.getToken('userName').then((res) => {
  //   //     this.setState({
  //   //       userName: res
  //   //     });
  //   //   })
  //   // }
  //   return true;
  // }

  renderScene(route, navigator) {
    // console.log('renderScene: ',route.id);
    // let scene = {this.state.view ? <Profile /> : <Home navigator={navigator} />};
    let scene = <Home navigator={navigator} />;
    if (this.state.loggedIn) {
        console.log('logged in pls go to profile')
        scene = <Profile navigator={navigator} />;
    }

    // if (route.id === 'Home') {
    //   scene = <Home navigator={navigator} />;
    // }
    if (route.id === 'Profile') {
      scene = <Profile navigator={navigator} />;
    } else if (route.id === 'Register') {
        scene = <Register navigator={navigator} />
    } else if (route.id === 'Selling') {
        scene = <ViewPosts criteria={{type: 'Selling'}} navigator={navigator} />
    } else if (route.id === 'Buying') {
        scene = <ViewPosts criteria={{type: 'Buying'}} navigator={navigator} />
    } else if (route.id === 'Search') {
        scene = <Search navigator={navigator} />
    } else if (route.id === 'Post') {
        scene = <Post {...route.props} />
    } else if (route.id === 'ViewPosts') {
        scene = <ViewPosts {...route.props} />
    } else if (route.id === 'ViewPost') {
        scene = <ViewPost {...route.props} />
    } else if (route.id === 'Login') {
        scene = <Login trigger={this.triggerLogin} navigator={navigator} />
    } else if (route.id === 'BarcodeScanner') {
        scene = <BarcodeScanner navigator={navigator} />
    } else if (route.id === 'Logout') {
        // ApiUtils.removeToken('Login_Token');
        // route.id = 0;
      scene = <Home navigator={navigator} />
    }

    return (
      <View style={styles.container}>
        {scene}
      </View>
    );
  }

  triggerLogin() {
    // console.log('trigger');
    // e.preventDefault();
    this.setState({loggedIn: true});
    this.setState({view: 'Profile'});
  }

  render() {
    let navigationButtons = NavOptions.map((item) =>
      <NavItem
        key={item.id}
        title={item.name}
        icon={item.icon}
        onPress={() => {
          // console.log(this.refs.navigator)
          this.refs.drawer.closeDrawer();
          if (item.id === 'Logout') {
            this.setState({view: ''});
            ApiUtils.removeToken('Login_Token').then((res) => {
              ApiUtils.setToken('userName', '').then((res) => {
                this.setState({loggedIn: false});
                this.setState({userName: ''});
                this.refs.navigator.resetTo({id: item.id});
                return res;
              });
              return res;
              // this.setState({userName: ''});
              // this.refs.navigator.resetTo({id: item.id});
            });
          }
          else {
            this.setState({view: item.id});
            let routes = this.refs.navigator.getCurrentRoutes();
            let current = routes[routes.length-1];
            if (current.id !== item.id) {
              this.refs.navigator.push({id: item.id});
            }
          }
        }}
      />
    );
    let navigationView = (
      <View style={{flex: 3, backgroundColor: '#262626', paddingTop: 20}}>
        {navigationButtons}
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref='drawer'
        drawerLockMode={this.state.loggedIn ? 'unlocked' : 'locked-closed'}
        renderNavigationView={() => navigationView}>
          <View style={{height: (this.state.loggedIn) ? 56 : 0}}>
            <ToolbarAndroid
              navIcon={require('../../img/menu.png')}
              onIconClicked={() => this.refs.drawer.openDrawer()}
              style={styles.toolbar}
              title={'EZTextbook'}
            />
          </View>
          <Navigator
            initialRoute={this.state.userName ? { id: 'Profile' } : { id: 'Home' }}
            ref='navigator'
            renderScene={this.renderScene.bind(this)}
            configureScene={() => {
              if (this.state.loggedIn) {
                return Navigator.SceneConfigs.FadeAndroid;
              }
              else {
                return Navigator.SceneConfigs.PushFromRight;
              }
            }}
            // onDidFocus={() => console.log('navigator: onDidFocus')}
            // onWillFocus={() => console.log('navigator: onWillFocus')}
          />
      </DrawerLayoutAndroid>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
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
