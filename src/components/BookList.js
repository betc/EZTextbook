import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
    if (this.props.books !== []) { this.setState({books: this.props.books}); }
    else {
     axios.get('https://eztextbook.herokuapp.com/api/books?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDIzMjU0MH0.5cN06javzNAaCbT0DHFzDwmtzGppX_LVX72P4azl_Fk')
      .then(response => this.setState({books: response.data}));
    }
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
      if (this.state.search !== "" && (book.title.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1 ||
          book.courses.indexOf(this.state.search.toString().toUpperCase()) > -1 ||
          book.isbn.indexOf(this.state.search) !== -1)) {
            return <BookDetail key={book.title} book={book} navigator={this.props.navigator} />
      }
    });
  }

  render() {
    return (
      <View>
        <SearchBar filterText={this.filterText} placeholder='Search by Book Title/ISBN/Course Number' />
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
