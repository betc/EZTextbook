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
    };
  }


  componentDidMount() {
      return ApiUtils.getLoginToken('Login_Token').then((res) => {
        // this.setState({'token': res});
        // console.log('token: ', this.state.token)

        fetch(`https://eztextbook.herokuapp.com/api/posts?token=${res}&type=Selling)`)
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
