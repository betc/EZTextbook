import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
//import axios from 'axios';
import BookDetail from './BookDetail';
import Books from './Books.json';
import SearchBar from './SearchBar';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: Books,
      search: '',
    };
    this.filterText = this.filterText.bind(this);
  }

  filterText(event) {
    const searchText = event.nativeEvent.text;
    this.setState({
      search: searchText
    });
  }

  renderBooks() {
    return this.state.books.map(book => {
      if (book.title.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1 ||
          book.courseid.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1 ||
          book.isbn.indexOf(this.state.search) !== -1) {
        return <BookDetail key={book.title} book={book} />
      }
    });
  }

  render() {
    return (
      <View>
        <SearchBar filterText={this.filterText} />
        <ScrollView>
          {this.renderBooks()}
        </ScrollView>
      </View>
    );
  }
}

// Make the component available to other parts of the app
export default BookList;
