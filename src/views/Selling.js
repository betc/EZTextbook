import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import PostDetail from '../components/PostDetail';
import ApiUtils from '../ApiUtils'
// import { getLoginToken } from '../ApiUtils';

class Selling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      token: ''
    };
  }

  componentDidMount() {
    console.log
    ApiUtils.getLoginToken('Login_Token').then((res) => {
      this.setState({'token': res});
      console.log('token: ', this.state.token)
    });
    

    return fetch('https://eztextbook.herokuapp.com/api/posts?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDIzMjU0MH0.5cN06javzNAaCbT0DHFzDwmtzGppX_LVX72P4azl_Fk&type=Selling')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({posts: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });

  }

  renderPosts() {
    return this.state.posts.map((post) =>
      <PostDetail key={post._id} post={post} navigator={this.props.navigator} />
    );
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.renderPosts()}
        </ScrollView>
      </View>
    );
  }
}

// Make the component available to other parts of the app
export default Selling;
