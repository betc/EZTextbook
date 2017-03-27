import React, { Component } from 'react';
import { View, Picker, TextInput } from 'react-native';

import Header from '../components/Header';
import BookList from '../components/BookList';

class Search extends Component {
/*    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
    }
*/
    componentWillMount() {
 //       if (this.props.books !== []) this.setState({books: this.props.books});
        console.log("in Search");
        console.log(this.props.books);
    }

  render() {
    return (
      <View>
        <Header headerText={'Search Books'} />
        <BookList navigator={this.props.navigator}  books={this.props.books}/>
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
