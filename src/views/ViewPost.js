import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, Linking, TouchableOpacity, Alert, Image, ScrollView, Dimensions } from 'react-native';
import Communications from 'react-native-communications';

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import ButtonSection from '../components/ButtonSection';
import Button from '../components/Button';
import ImageViewer from '../components/ImageViewer';
import { IconButton } from '../components/Buttons';
import { H1, H2, H3 } from '../components/Headings';
import FormField from '../components/FormField';
import BookConditions from '../constants/BookConditions';
import ApiUtils from '../ApiUtils';
import axios from 'axios';

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      creatorId: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: null,
      title: '',
      description: '',
      status: '',
      condition: '100',
      price: '',
      images: [],
      editable: false,
      autoFocus: false,
      hide: true,
      update: "Update Post",
      inWishList: false,
      interestsListButton: ''
    };
  }

  componentDidMount() {
    // console.log('book ', BookConditions[30]);

    this.setState({
      title: this.props.title,
      description: this.props.description,
      status: this.props.status,
      condition: this.props.condition,
      price: this.props.price,
      images: this.props.images,
    });
    ApiUtils.getToken('Login_Token').then((res) => {
      this.setState({token: res});
      var creatorid = this.props.creator._id ? this.props.creator._id : this.props.creator;
      fetch(`https://eztextbook.herokuapp.com/api/user/visit/profile/${creatorid}?token=${this.state.token}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({firstname: responseJson.firstname});
          this.setState({lastname: responseJson.lastname});
          this.setState({phone: responseJson.phone});
          if (typeof responseJson.local != 'undefined') {
            this.setState({email: responseJson.local.email});
          } else {
            if (typeof responseJson.facebook.email != 'undefined')
              this.setState({email: responseJson.facebook.email});
          }
        })
        .catch((error) => {
          console.error(error);
        });
      fetch(`https://eztextbook.herokuapp.com/api/user/interests?token=${this.state.token}`)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          const interestsList = [];
          for(i = 0; i < responseJson.length; i++) {
            interestsList.push(responseJson[i]._id);
          }
          this.setState({
            inWishList: interestsList.indexOf(this.props._id) !== -1
          });
          // console.log(interestsList);
          // console.log(this.props._id);
          // console.log(this.state.inWishList);
          this.setState({
            interestsListButton: this.state.inWishList ? 'Remove' : 'Interested'
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
    ApiUtils.getToken('userId').then((result) => {
      if (typeof this.props.creator === 'object') {
        this.setState({
          hide: !(this.props.creator._id === result)
        });
      } else {
        this.setState({
          hide: !(this.props.creator === result)
        });
      }
    });
  }

  markSpam() {
    fetch(`https://eztextbook.herokuapp.com/api/post/report?token=${this.state.token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: this.props._id
      })
    })
    .then(response => response.json())
    .then((responseJson) => {
        if (responseJson.success !== false) {
          Alert.alert('You have reported this post as a spam');
        } else {
          Alert.alert('You cannot report a post spam twice');
        }
    });
  }

  modifyInterestsList() {
    if (this.state.inWishList) {
      fetch(`https://eztextbook.herokuapp.com/api/user/interests/delete?token=${this.state.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: this.props._id
        })
      })
      .then(response => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        Alert.alert('Post deleted from your Interest List.');
        this.setState({
          inWishList: false,
          interestsListButton: 'Interested'
        });
      });
    } else {
      fetch(`https://eztextbook.herokuapp.com/api/user/interests/add?token=${this.state.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: this.props._id
        })
      })
      .then(response => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        Alert.alert('Post added to your Interest List.');
        this.setState({
          inWishList: true,
          interestsListButton: 'Remove'
        });
      });
    }
  }

  updateField(fieldName, event) {
    if (fieldName == 'Title') {
      this.setState({
        title: event
      })
    } else if (fieldName == 'Description') {
      this.setState({
        description: event
      })
    } else if (fieldName == 'Status') {
      this.setState({
        status: event
      })
    } else if (fieldName == 'Condition') {
      this.setState({
        condition: event
      })
    } else {
      this.setState({
        price: event
      })
    }
  }

  editPost() {
    if (this.state.update == "Update Post") {
      this.setState({
        update: "Save Change",
        editable: true,
        autoFocus: true
      });
    } else {
      console.log({
        _id: this.props._id,
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        condition: parseInt(this.state.condition),
        price: parseFloat(this.state.price).toFixed(2)
      });
      fetch(`https://eztextbook.herokuapp.com/api/post/update?token=${this.state.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: this.props._id,
          title: this.state.title,
          description: this.state.description,
          status: this.state.status,
          condition: parseInt(this.state.condition),
          price: parseFloat(this.state.price).toFixed(2)
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.success === false) {
            Alert.alert('An error occurred when updating.')
          }
          else {
            Alert.alert("Post Updated");
          }
          this.setState({
            update: "Update Post",
            editable: false,
            autoFocus: false
          });
        })
        .catch((error) => {
          console.error(error);
        });
      }
  }

  render() {
    var {height, width} = Dimensions.get('window');
    const { _id, title, description, creator, book, price, condition, status, dateCreated, type } = this.props;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      priceTextStyle
    } = styles;
    const role = type === 'Buying' ? 'Buyer' : 'Seller';
    const message = 'RE: ' + title;
    console.log(this.state.images);
    // let images = this.state.images.length > 0 ?
    //   <ImagesViewer urls={this.state.images} /> :
    //   null;
    let images = this.state.images.map((url) => {
      // console.log('image url ',`https://eztextbook.herokuapp.com/images/${url}?token=${this.state.token}`)
      return (
        <ImageViewer key={url} url={`https://eztextbook.herokuapp.com/images/${url}?token=${this.state.token}`} />
      );
    });
    return (
      <Card header={type.toUpperCase()} style={{maxHeight: height-100}}>
        <ScrollView style={styles.headerContentStyle}>
            <View style={styles.cellStyle}>
              {this.state.editable ? <FormField
                defaultValue={this.state.title}
                editable={this.state.editable}
                autoFocus={this.state.autoFocus}
                onChangeText={this.updateField.bind(this, 'Title')}
              /> : <H1>{this.state.title}</H1> }
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>
              <H2>{this.props.book.title.trim()}</H2>
              </Text>
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>
              Posted by {this.state.firstname + ' ' + this.state.lastname} (Rating: {creator.rating})
              </Text>
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}><H3>{'\n'}Description: </H3></Text>
              {this.state.editable ? <FormField
                defaultValue={this.state.description}
                editable={this.state.editable}
                autoFocus={this.state.autoFocus}
                onChangeText={this.updateField.bind(this, 'Description')}
              /> : <Text>{this.state.description+'\n\n'}</Text> }
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}><H3>Status: </H3></Text>
              {this.state.editable ? <Picker
                enabled={this.state.editable}
                selectedValue={this.state.status}
                onValueChange={(val) => this.setState({status: val})}>
                <Picker.Item label="Open" value="Open" />
                <Picker.Item label="Closed" value="Closed" />
                <Picker.Item label="On hold" value="On hold" />
              </Picker> : <Text>{this.state.status+'\n\n'}</Text> }
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}><H3>Condition: </H3></Text>
              {this.state.editable ? <Picker
                enabled={this.state.editable}
                selectedValue={this.state.condition}
                onValueChange={(val) => this.setState({condition: val})}>
                <Picker.Item label="Used - Worn" value="30" />
                <Picker.Item label="Used - Has Writings" value="60" />
                <Picker.Item label="Used - Like New" value="90" />
                <Picker.Item label="Brand New" value="100" />
              </Picker> : <Text>{BookConditions[this.state.condition]+'\n\n'}</Text> }
            </View>
            <View style={styles.cellStyle}>
              <Text><H3>Price: </H3></Text>
              {this.state.editable ? <FormField
                defaultValue={this.state.price + ''}
                editable={this.state.editable}
                autoFocus={this.state.autoFocus}
                onChangeText={this.updateField.bind(this, 'Price')}
              /> : <Text>{this.state.price+'\n\n'}</Text> }
            </View>
            <View>
              {images}
            </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <IconButton
              title={`Email ${role}`}
              icon={'envelope'}
              onPress={() => Communications.email([this.state.email], null, null, message, '\n- Sent from EZTextbook')}
            />
            <IconButton
              title={`SMS Message`}
              icon={'commenting'}
              onPress={() => Communications.text(this.state.phone, message)}
            />
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <IconButton
              title={`Mark as Spam`}
              icon={'trash'}
              onPress={this.markSpam.bind(this)}
            />
            <IconButton
              title={this.state.interestsListButton}
              icon={'star'}
              onPress={this.modifyInterestsList.bind(this)}
            />
            <IconButton
              title={this.state.update}
              icon={'pencil'}
              onPress={this.editPost.bind(this)}
              style={this.state.hide ? styles.hidden : null}
            />
          </View>
        </ScrollView>
      </Card>
    )
  }
}

const styles = {
  headerContentStyle: {
    marginBottom: 5,
    padding: 5
  },
  headerTextStyle: {
    fontSize: 13
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonStyle: {
    marginTop: 5,
    height: 20,
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#bddbfa',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#84bbf3',
  },
  hidden: {
    width: 0,
    height: 0
  },
  input: {
    marginLeft: 4,
    height: 35,
    width: 350,
    fontSize: 13
  },
  priceInput: {
    height: 35,
    width: 200,
    fontSize: 13,
    fontWeight: '300',
    color: '#ff471a'
  },
  cellStyle: {
    flexDirection: 'column'
  },
  image: {
    borderRadius: 10,
    width: 70,
    height: 70
  }
};

export default ViewPost;
