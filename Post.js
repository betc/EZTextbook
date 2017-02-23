import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
const Item = Picker.Item;

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    	description: "",
    	creator: "",
    	book: "",
    	price: 0,
    	condition: "",
    	type: "Selling"
    };
  }

  handleSubmit() {
    return fetch('http://localhost:3000/api/post/create' {
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
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.post;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text>Buy/Sell</Text>
        <Picker
          onValueChange={(type) => this.setState({type})}>
          <Item label="I'm selling a book" value="Selling" />
          <Item label="I'm looking for a book" value="Buying" />
        </Picker>
        <Text>Course</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Course"
        />
        <TextInput
          style={{height: 40}}
          onChangeText={(title) => this.setState({title})}
          placeholder="Title"
        />
        <TextInput
          style={{height: 40}}
          onChangeText={(creator) => this.setState({creator})}
          placeholder="Author"
        />
        <TextInput
          style={{height: 40}}
          onChangeText={(price) => this.setState({price})}
          placeholder="Price"
        />
        <Text>Condition</Text>
        <Picker
          onValueChange={(condition) => this.setState({condition})}>
          <Item label="Used - Worn" value="usedWork" />
          <Item label="Used - Like New" value="usedNew" />
          <Item label="Brand New" value="new" />
        </Picker>
      </View>
      <Button
        onPress={handleSubmit}
      />
    )
  }
}
