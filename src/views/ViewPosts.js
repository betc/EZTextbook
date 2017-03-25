import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import PostDetail from '../components/PostDetail';

class ViewPosts extends Component {

  renderPosts() {
    return this.props.posts.map((post) =>
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
export default ViewPosts;
