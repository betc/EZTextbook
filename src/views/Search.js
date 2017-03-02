import React, { Component } from 'react';
import { View, Picker, TextInput } from 'react-native';

import Header from '../components/Header';
import BookList from '../components/BookList';
import Courses from '../components/Courses.json';
import Books from '../components/Books.json';

class Search extends Component {
  // state = { Courses, Books, search: '' };
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
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
        <Header headerText={'Search Books'} />
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
