import React from 'react';
import { TextInput } from 'react-native';

const SearchBar = () => {
  return (
    <TextInput placeholder='search...' style={styles.searchBarStyle} />
  );
};

const styles = {
  searchBarStyle: {
    height: 35,
    borderColor: '#343d46',
    borderWidth: 1,
    borderRadius: 5,
    textShadowColor: 'red'
  }
};
export default SearchBar;
