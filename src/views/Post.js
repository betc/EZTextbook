import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Text, Picker, Button, ProgressBarAndroid, Alert, TouchableOpacity, Image, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ApiUtils from '../ApiUtils';
import FormField from '../components/FormField';
import { H3 } from '../components/Headings';
import { ButtonSubmit } from '../components/Buttons';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      successMsg: '',
      title: '',
    	description: '',
    	price: '',
    	condition: 30,
    	type: 'Selling',
      images: [],
      imagesUploaded: []
    };
  }

  formValidator() {
    if (this.state.title.trim() === '' || this.state.price.trim() === '') {
      this.setState({successMsg: 'Please fill out required (*) fields.'});
      return false;
    }
    else if (parseFloat(this.state.price) < 0 || isNaN(this.state.price)) {
      this.setState({successMsg: 'Please enter a valid price.'});
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.setState({title: this.state.type + " - " + this.props.title});
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
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
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
    if (!this.formValidator()) {
      return;
    }
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
            this.setState({successMsg: 'An error occured.'});
            Alert.alert('An error occurred when trying to submit. Please make sure all required fields are valid.')
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
    const imageUploader = (
      <View>
      <H3>Upload Photos</H3>
      <View style={{flexDirection:'row', flexWrap:'wrap', marginBottom: 20}}>
        <TouchableOpacity onPress={
          this.state.images.length <= 2 ? this.imagePicker.bind(this) : () => Alert.alert('Maximum images exceeded.')
        }>
          <View style={[styles.image, styles.imageContainer]}>
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
          <Image style={styles.image} source={imageUrl} />
        </TouchableOpacity>)}
      </View>
      </View>
    );
    return (
      <ScrollView style={styles.container}>
        <H3>Buy/Sell</H3>
        <Picker
          selectedValue={this.state.type}
          onValueChange={(type) => this.setState({type})}>
          <Item label="I'm selling a book" value="Selling" />
          <Item label="I'm buying a book" value="Buying" />
        </Picker>
        <H3>Title*</H3>
        <FormField
          onChangeText={(title) => this.setState({title})}
          defaultValue={this.state.type + " - " + this.props.title.trim()}
        />
        <H3>Description</H3>
        <FormField
          multiline={true}
          onChangeText={(description) => this.setState({description})}
        />
        <H3>Price* ($)</H3>
        <FormField
          onChangeText={(price) => this.setState({price: price})}
          keyboardType={'numeric'}
        />
        <H3>Condition</H3>
        <Picker
          selectedValue={this.state.condition}
          onValueChange={(condition) => this.setState({condition})}>
          <Item label="Used - Worn" value="30" />
          <Item label="Used - Has Writings" value="60" />
          <Item label="Used - Like New" value="90" />
          <Item label="Brand New" value="100" />
        </Picker>
        {this.state.type === 'Selling' ? imageUploader : null}
        <ButtonSubmit
          title="Submit"
          onPress={this.handleSubmit.bind(this)}
        />
        <H3>{this.state.successMsg}</H3>
      </ScrollView>
    )
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}>{error}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  imageContainer: {
    borderColor: '#9B9B9B',
    backgroundColor: '#fff',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    borderRadius: 75,
    width: 50,
    height: 50
  }
});
