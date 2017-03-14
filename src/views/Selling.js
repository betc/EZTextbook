import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PostDetail from '../components/PostDetail';

class Selling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    return fetch('https://eztextbook.herokuapp.com/api/posts?type=Selling')
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
      <PostDetail key={post._id} post={post} />
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
