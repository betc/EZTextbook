import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
const Item = Picker.Item;

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <Picker>
          <Item label="I'm selling a book" value="sell" />
          <Item label="I'm looking for a book" value="buy" />
        </Picker>
        <TextInput
          style={{height: 40}}
          placeholder="Course"
        />
        <TextInput
          style={{height: 40}}
          placeholder="Title"
        />
        <TextInput
          style={{height: 40}}
          placeholder="Author"
        />
        <Picker>
          <Item label="Used - Worn" value="usedWork" />
          <Item label="Used - Like New" value="usedNew" />
          <Item label="Brand New" value="new" />
        </Picker>
      </View>
    )
  }
}
