import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class NavItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#e6e6e6",
    fontSize: 20,
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#4d4d4d",
  }
});
