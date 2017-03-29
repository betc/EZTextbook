import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, PixelRatio } from 'react-native';
import { H3 } from './Headings';

export default class FormField extends Component {
  render() {
    return (
      <View>
        {this.props.label ? <H3>{this.props.label}</H3> : null}
        <TextInput
          onChangeText={this.props.onChangeText}
          underlineColorAndroid={'transparent'}
          style={this.props.style ? this.props.style : styles.input}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    marginTop: 50,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 15,
    height: 35,
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#9B9B9B',
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5
  }
});
