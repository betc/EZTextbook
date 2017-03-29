import React, { Component } from 'react';
import { View, Picker, TextInput } from 'react-native';

import Header from '../components/Header';
import BookList from '../components/BookList';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentWillMount() {
    //       if (this.props.books !== []) this.setState({books: this.props.books});
    // console.log("in Search");
    // console.log(this.props.books);
    if (this.props.books) {
      this.setState({books: this.props.books});
    }
    else {
     axios.get('https://eztextbook.herokuapp.com/api/books?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDIzMjU0MH0.5cN06javzNAaCbT0DHFzDwmtzGppX_LVX72P4azl_Fk')
      .then(response => this.setState({books: response.data}));
    }
  }

  render() {
    return (
      <View>
      <BookList navigator={this.props.navigator} books={this.state.books}/>
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
