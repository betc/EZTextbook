import React, { Component } from 'react';
import { View, Picker, TextInput } from 'react-native';

import BookList from './BookList';
import Courses from './Courses.json';
import Books from './Books.json';

class Search extends Component {
  // state = { Courses, Books, search: '' };
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  updateSearch(event) {
    console.log(event.target.value());
    this.setState({search: event.target.value});
  }

  render() {
    // const books = Books;
    let filteredBooks = Books.filter(
      (book) => {
        return book.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <View>
        <TextInput
          placeholder='Search...'
          onChangeText={(search) => this.setState({search})}
          style={styles.searchBarStyle}
        />
        <BookList data={filteredBooks} />
      </View>
    )
  };
}

const styles = {
  searchBarStyle: {
    height: 35,
    borderColor: '#343d46',
    borderWidth: 1,
    borderRadius: 5,
    textShadowColor: 'red'
  }
};
export default Search;
