import React, { Component } from 'react';
import { TextInput } from 'react-native';

class SearchBar extends Component {
  render() {
    return (
      <TextInput placeholder='Search by Book Title/ISBN/Course Number'
      style={styles.searchBarStyle}
      onChange={this.props.filterText}
      />
    )
  };
}

const styles = {
  searchBarStyle: {
    height: 35,
    borderColor: '#63717f',
    borderWidth: 2,
    borderRadius: 5,
    textShadowColor: 'red',
    marginLeft: 1,
    marginRight: 1
  }
};
export default SearchBar;
