import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage, Slider, Picker } from 'react-native';
import SearchBar from '../components/SearchBar';
import ViewPostsItem from '../components/ViewPostsItem';
import { getPosts } from '../FetchUtils';

class ViewPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      condition: '-1',
      posts: []
    };
    this.filterText = this.filterText.bind(this);
  }

  componentDidMount() {
    getPosts(this.props.criteria)
    .then((response) => {
      this.setState({posts: response});
    });
  }

  renderPosts() {
    return this.state.posts.map(post => {
      if (post.title.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1 &&
          (post.condition === parseInt(this.state.condition) || this.state.condition === '-1')) {
          return <ViewPostsItem key={post._id} post={post} navigator={this.props.navigator} />
      }
    });
  }

  filterText(event) {
    const searchText = event.nativeEvent.text;
    this.setState({
      search: searchText
    });
  }

  render() {
    const Item = Picker.Item;
    return (
      <View>
        <SearchBar filterText={this.filterText} placeholder='Search Title' />
        <Picker
          selectedValue={this.state.condition}
          onValueChange={(condition) => this.setState({condition})}>
          <Item label="All Conditions" value="-1" />
          <Item label="Used - Worn" value="30" />
          <Item label="Used - Has Writings" value="60" />
          <Item label="Used - Like New" value="90" />
          <Item label="Brand New" value="100" />
        </Picker>
        <ScrollView>
          {this.renderPosts()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  picker: {
    fontSize: 9
  }
};
// Make the component available to other parts of the app
export default ViewPosts;
