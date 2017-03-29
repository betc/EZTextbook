import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NavItem extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.text}> <Icon name={this.props.icon} size={20} color="#ffcc00" />  {this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#e6e6e6",
    fontSize: 20,
    height: 50,
    padding: 10,
    // borderBottomWidth: 1,
    // borderColor: "#4d4d4d",
  }
});
