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
      order: 'none',
      posts: [],
      postsCopy: [],
      update: true,
    };
    this.filterText = this.filterText.bind(this);
  }

  componentDidMount() {
    getPosts(this.props.criteria)
    .then((response) => {
      this.setState({
        posts: response,
        postsCopy: response
      });
    });
  }

  sortPosts(selected) {
    let sortedPosts = this.state.posts.slice();
    if (selected === 'ascending') {
      sortedPosts.sort(function(a, b) {
        return a.price - b.price
      });
    } else if (selected === 'descending') {
      sortedPosts.sort(function(a, b) {
        return b.price - a.price
      });
    } else {
      sortedPosts = this.state.postsCopy.slice();
    }
    this.setState({
      order: selected,
      posts: sortedPosts
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
        <Text>Sort Posts by Price from:</Text>
        <Picker
          selectedValue={this.state.order}
          onValueChange={(order) => this.sortPosts(order)}>
          <Item label="None" value="none" />
          <Item label="Low to High" value="ascending" />
          <Item label="High to Low" value="descending" />
        </Picker>
        <ScrollView style={styles.contentContainer}>
          {this.renderPosts()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  contentContainer: {
    marginBottom: 100
  },
  picker: {
    fontSize: 9
  }
};
// Make the component available to other parts of the app
export default ViewPosts;
