import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import BookDetail from './BookDetail';
import Books from './Books.json';
import SearchBar from './SearchBar';
import axios from 'axios';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: '',
    };
    this.filterText = this.filterText.bind(this);
  }

  componentWillMount() {
    axios.get('https://eztextbook.herokuapp.com/api/books')
      .then(response => this.setState({books: response.data}));
  }

  filterText(event) {
    const searchText = event.nativeEvent.text;
    this.setState({
      search: searchText
    });
  }

  renderBooks() {
    //console.log(this.state.books);
    return this.state.books.map(book => {
      if (book.title.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1 ||
          book.courses.indexOf(this.state.search.toString().toUpperCase()) > -1 ||
          book.isbn.indexOf(this.state.search) !== -1) {
            return <BookDetail key={book.title} book={book} navigator={this.props.navigator} />
      }
    });
  }

  render() {
    return (
      <View>
        <SearchBar filterText={this.filterText} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.renderBooks()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  contentContainer: {
    paddingBottom: 200
  }
};

export default BookList;
