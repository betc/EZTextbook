import React, { Component } from 'react';
import { View, ScrollView, Text, AsyncStorage, Slider, Picker, Dimensions, ToastAndroid } from 'react-native';
import SearchBar from '../components/SearchBar';
import ViewPostsItem from '../components/ViewPostsItem';
import { getPosts } from '../FetchUtils';
import Events from 'react-native-simple-events';

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
      screenWidth: 0,
    };
    this.filterText = this.filterText.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  fetchPosts() {
    getPosts(this.props.criteria)
    .then((response) => {
      this.setState({
        posts: response,
        postsCopy: response
      });
    });
  }

  componentDidMount() {
    Events.on('backPressed', 'ViewPost', () => {
      this.fetchPosts();
      this.render();
      // ToastAndroid.show('rendered', ToastAndroid.SHORT);
    })

    let {height, width} = Dimensions.get('window');
    this.setState({screenWidth: width});
    console.log('screen width: ',this.state.screenWidth);

    this.fetchPosts();
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
    const styles = {
      contentContainer: {
        marginBottom: 100
      },
      picker: {
        width: this.state.screenWidth/2,
      }
    };

    const Item = Picker.Item;
    return (
      <View>
        <SearchBar filterText={this.filterText} placeholder='Search Title' />
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.condition}
            onValueChange={(condition) => this.setState({condition})}>
            <Item label="All Conditions" value="-1" />
            <Item label="Used - Worn" value="30" />
            <Item label="Used - Has Writings" value="60" />
            <Item label="Used - Like New" value="90" />
            <Item label="Brand New" value="100" />
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={this.state.order}
            onValueChange={(order) => this.sortPosts(order)}>
            <Item label="Most Recent" value="none" />
            <Item label="Price from Low to High" value="ascending" />
            <Item label="Price from High to Low" value="descending" />
          </Picker>
        </View>
        <ScrollView style={styles.contentContainer}>
          {this.renderPosts()}
        </ScrollView>
      </View>
    );
  }
}


// Make the component available to other parts of the app
export default ViewPosts;
