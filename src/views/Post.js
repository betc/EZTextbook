import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, Button, ProgressBarAndroid } from 'react-native';
const Item = Picker.Item;

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      title: "",
    	description: "",
    	creator: "58d324a887176e1354b8ed4a",
    	price: 0,
    	condition: 0,
    	type: "Selling"
    };
  }

  handleSubmit() {
    this.setState({successMsg: "Receiving..."});
    return fetch('https://eztextbook.herokuapp.com/api/post/create?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDIzMjU0MH0.5cN06javzNAaCbT0DHFzDwmtzGppX_LVX72P4azl_Fk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
      	description: this.state.description,
      	creator: this.state.creator,
      	book: this.props.book,
      	price: parseFloat(this.state.price),
      	condition: parseInt(this.state.condition),
      	type: this.state.type
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({successMsg: "Submitted!"});
        // this.navigator.pop();
      })
      .catch((error) => {
        this.setState({successMsg: "An error occured."});
        console.error(error);
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
        <Text>Title</Text>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          placeholder={this.state.type + " - " + this.props.title}
        />
        <Text>Description</Text>
        <TextInput
          multiline={true}
          onChangeText={(description) => this.setState({description})}
        />
        <Text>Price ($)</Text>
        <TextInput
          onChangeText={(price) => this.setState({price: parseInt(price)})}
        />
        <Text>Condition</Text>
        <Picker
          selectedValue={this.state.condition}
          onValueChange={(condition) => this.setState({condition})}>
          <Item label="Used - Worn" value="30" />
          <Item label="Used - Has Writings" value="60" />
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
