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
    	creator: "58b3291604873f0b502a2a1f",
    	book: "58b328f604873f0b502a29fa",
    	price: 0,
    	condition: 0,
    	type: "Selling"
    };
  }

  handleSubmit() {
    this.setState({successMsg: "Receiving..."});
    return fetch('http://656063df.ngrok.io/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
      	description: this.state.description,
      	creator: this.state.creator,
      	book: this.state.book,
      	price: parseInt(this.state.price),
      	condition: parseInt(this.state.condition),
      	type: this.state.type
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({successMsg: "Submitted!"});
        // console.log(responseJson);
        // console.log({
        //   title: this.state.title,
        // 	description: this.state.description,
        // 	creator: this.state.creator,
        // 	book: this.state.book,
        // 	price: parseInt(this.state.price),
        // 	condition: parseInt(this.state.condition),
        // 	type: this.state.type
        // })
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
          value={this.state.type + " - " + this.props.title}
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
