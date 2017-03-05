import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import BookDetail from './PostDetail';

class Selling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
    };
  }

  componentWillMount() {
    function getMoviesFromApiAsync() {
      return fetch('https://eztextbook.herokuapp.com/api/posts?type=Selling')
        .then((response) => response.json())
        .then((responseJson) => {
          this.state.setState({posts: responseJson});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    let posts = this.state.posts.map((post) => {
      <PostDetail key={post._id} post={post} />
    });

    return (
      <View>
        <ScrollView>
          {posts}
        </ScrollView>
      </View>
    );
  }
}

// Make the component available to other parts of the app
export default Selling;
