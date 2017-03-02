import React, { Component } from 'react';
import { View, Picker, TextInput } from 'react-native';

import Header from '../components/Header';
import BookList from '../components/BookList';

class Search extends Component {

  render() {
    return (
      <View>
        <Header headerText={'Search Books'} />
        <BookList navigator={this.props.navigator} />
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
