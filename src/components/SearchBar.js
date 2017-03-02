import React, { Component } from 'react';
import { View, Picker, TextInput } from 'react-native';

import Courses from './Courses.json';

class SearchBar extends Component {
  state = { Courses };

  // getCourses() {
  //   return this.state.Courses.data.map(course =>
  //     <Picker.Item label={course.title} value={course.title} />
  //   );
  // }
  render() {
    return (
      <View>
        <TextInput placeholder='search...' style={styles.searchBarStyle} />
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
export default SearchBar;
