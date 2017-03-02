import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, Button } from 'react-native';
const Item = Picker.Item;

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      title: "",
    	description: "",
    	creator: "58b3291604873f0b502a2a1f",
    	book: "58b328f604873f0b502a29fa",
    	price: 0,
    	condition: "",
    	type: "Selling"
    };
  }

  handleSubmit() {
    console.log(this.state);
    this.state.successMsg = "Submitted";
    return fetch('http://656063df.ngrok.io/api/post/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
      	description: this.state.description,
      	creator: this.state.creator,
      	book: this.state.book,
      	price: this.state.title,
      	condition: this.state.condition,
      	type: this.state.type
      })
    });
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text>Buy/Sell</Text>
        <Picker
          selectedValue={this.state.type}
          onValueChange={(type) => this.setState({type})}>
          <Item label="I'm selling a book" value="Selling" />
          <Item label="I'm buying a book" value="Buying" />
        </Picker>
        <TextInput
          style={{height: 40}}
          onChangeText={(title) => this.setState({title})}
          placeholder="Title"
        />
        <TextInput
          style={{height: 40}}
          onChangeText={(description) => this.setState({description})}
          placeholder="Description"
        />
        <TextInput
          style={{height: 40}}
          onChangeText={(price) => this.setState({price})}
          placeholder="Price"
        />
        <Text>Condition</Text>
        <Picker
          selectedValue={this.state.condition}
          onValueChange={(condition) => this.setState({condition})}>
          <Item label="Used - Worn" value="30" />
          <Item label="Used - Like New" value="90" />
          <Item label="Brand New" value="100" />
        </Picker>
        <Button
          title="Submit"
          onPress={this.handleSubmit.bind(this)}
        />
        <Text>{this.state.successMsg}</Text>
      </View>
    )
  }
}
