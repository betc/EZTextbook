import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TextInput, Picker, Button, ProgressBarAndroid, Alert, TouchableOpacity, Image, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ApiUtils from '../ApiUtils';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      successMsg: '',
      title: '',
    	description: '',
    	price: 0,
    	condition: 0,
    	type: 'Selling',
      images: [],
      imagesUploaded: []
    };
  }

  imagePicker() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri, type: response.type, name: response.fileName };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          images: this.state.images.concat([source])
        });
      }
    });
  }

  handleSubmit() {
    if (this.state.images.length === 0) {
      this.handleForm();
    }
    else {
      let data = new FormData();
      this.state.images.map((image) => {
        data.append('images', image);
      });
      // console.log('to send: ', data);
      return ApiUtils.getToken('Login_Token').then((res) => {
        this.setState({token: res});
        fetch(`https://eztextbook.herokuapp.com/api/images/upload?token=${this.state.token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.success === false) {
              Alert.alert('An error occurred when uploading.')
            }
            else {
              this.setState({imagesUploaded: responseJson.imagenames});
              this.handleForm();
            }
            // return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
        });
      }
  }

  handleForm() {
    return ApiUtils.getToken('Login_Token').then((res) => {
      this.setState({token: res});
      this.setState({successMsg: 'Receiving...'});
      fetch(`https://eztextbook.herokuapp.com/api/post/create?token=${this.state.token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
        	description: this.state.description,
        	book: this.props.book,
        	price: parseFloat(this.state.price).toFixed(2),
        	condition: parseInt(this.state.condition),
        	type: this.state.type,
          images: this.state.imagesUploaded
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.success === false) {
            Alert.alert('An error occurred when trying to submit.')
          }
          else {
            this.setState({successMsg: 'Submitted!'});
            Alert.alert('Successfully posted.')
            this.props.navigator.pop();
          }
        })
        .catch((error) => {
          this.setState({successMsg: 'An error occured.'});
          Alert.alert('An error occcured.')
          console.error(error);
        });
    });
  }

  render() {
    const Item = Picker.Item;
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
        <Text>Upload Photos</Text>
        <View style={{flexDirection:'row', flexWrap:'wrap', marginBottom: 20}}>
          <TouchableOpacity onPress={this.imagePicker.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer]}>
              <Text>+</Text>
            </View>
          </TouchableOpacity>
          {this.state.images.map((imageUrl) =>
          <TouchableOpacity onPress={() => {
            var images = this.state.images;
            var index = images.indexOf(imageUrl)
            images.splice(index, 1);
            this.setState({images: images });
          }}>
            <Image style={styles.avatar} source={imageUrl} />
          </TouchableOpacity>)}
        </View>
        <Button
          title="Submit"
          onPress={this.handleSubmit.bind(this)}
        />
        <Text>{this.state.successMsg}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 50,
    height: 50
  }
});
