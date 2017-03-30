import React, { Component } from 'react';
import { View, TextInput, Image } from 'react-native';

class SearchBar extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          source={require('../../img/search.png')}
          style={styles.imageStyle}
        />
        <TextInput placeholder={this.props.placeholder}
        style={styles.searchBarStyle}
        onChange={this.props.filterText}
        underlineColorAndroid={'transparent'}
        />
      </View>
    )
  };
}

const styles = {
  searchBarStyle: {
    flex: 1,
    height: 35,
    marginLeft: 1,
    marginRight: 1,
  },
  imageStyle: {
    width: 35,
    height: 35,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 36,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0'
  }
};
export default SearchBar;
