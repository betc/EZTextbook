import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class NavItem extends Component {
  render() {
    return (
      <TouchableHighlight>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    backgroundColor: "#E9EAED",
    textAlign: "center",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  }
});
