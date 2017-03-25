import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import ViewPosts from './ViewPosts';
import ApiUtils from '../ApiUtils'

class SellBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      posts: [],
    };
  }

  componentDidMount() {
      return ApiUtils.getLoginToken('Login_Token').then((res) => {
        this.setState({token: res});
        // console.log('token: ', this.state.token)

        fetch(`https://eztextbook.herokuapp.com/api/posts?token=${this.state.token}&type=${this.props.type}`)
          .then((response) => response.json())
          .then((responseJson) => {
            // console.log(responseJson);
            this.setState({posts: responseJson});
          })
          .catch((error) => {
            console.error(error);
          });
      });

  }

  render() {
    return (
      <ViewPosts posts={this.state.posts} navigator={this.props.navigator} />
    );
  }
}

// Make the component available to other parts of the app
export default SellBuy;
