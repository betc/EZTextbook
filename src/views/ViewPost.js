import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, Button, ProgressBarAndroid } from 'react-native';
const Item = Picker.Item;

export default class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      title: "",
    	description: "",
    	creator: "58b3291604873f0b502a2a1f",
    	book: "58b328f604873f0b502a29fa",
    	price: 0,
    	condition: 0,
    	type: "Selling"
    };
  }


  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={styles.Title}>this.state.title</Text>
        <Text>Price: this.price</Text>
        <Text>Condition: this.Condition
        <TextInput
          multiline={true}
          onChangeText={(description) => this.setState({description})}
        />
        <Text>Price ($)</Text>
        <Text>Condition</Text>

      </View>
    )
  }
}