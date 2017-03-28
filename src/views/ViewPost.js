import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, ProgressBarAndroid, Linking, TouchableOpacity, Alert } from 'react-native';
import Communications from 'react-native-communications';

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import ButtonSection from '../components/ButtonSection';
import Button from '../components/Button';
import ApiUtils from '../ApiUtils';
import axios from 'axios';

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      creatorId: '',
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: null,
      title: '',
      description: '',
      status: 'open',
      condition: '100',
      price: '',
      editable: false,
      autoFocus: false,
      hide: true,
      update: "Update Post",
    };
  }

  componentWillMount() {
    ApiUtils.getToken('Login_Token').then((res) => {
      this.setState({token: res});
      // console.log('profile ', `${this.props}`);
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
      fetch(`https://eztextbook.herokuapp.com/api/post/${this.props._id}?token=${this.state.token}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            id: responseJson._id,
            title: responseJson.title,
            description: responseJson.description,
            status: responseJson.status,
            condition: responseJson.condition,
            price: responseJson.price,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
    ApiUtils.getToken('userId').then((result) => {
      this.setState({creatorId: result});
      this.setState({
        hide: !(this.props.creator._id === this.state.creatorId)
      });
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

  addToList() {
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
        if (responseJson.success !== false) {
          Alert.alert('Post added to your interest list');
        } else {
          Alert.alert("You've already added this post to your interest list");
        }
    });
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
      fetch(`https://eztextbook.herokuapp.com/api/post/update?token=${this.state.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: this.state.id,
          title: this.state.title,
          description: this.state.description,
          status: this.state.status,
          condition: this.state.condition,
          price: this.state.price
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success === false) {
            Alert.alert('An error occurred when updating.')
          }
          else {
            Alert.alert("Post Updated");
          }
          this.setState({
            update: "Update Profile",
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
    return (
      <Card>
          <View style={headerContentStyle}>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>
                Post Type:
              </Text>
              <TextInput
                style={styles.input}
                defaultValue={type}
                editable={false}
                autoFocus={false}
              />
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>Creator: </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.state.firstname + ' ' + this.state.lastname}
                editable={false}
                autoFocus={false}
              />
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>Title: </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.state.title}
                editable={this.state.editable}
                autoFocus={this.state.autoFocus}
                onChangeText={this.updateField.bind(this, 'Title')}
              />
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>Description: </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.state.description}
                editable={this.state.editable}
                autoFocus={this.state.autoFocus}
                onChangeText={this.updateField.bind(this, 'Description')}
              />
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>Status: </Text>
              <Picker enabled={this.state.editable}>
                <Picker.Item label="open" value="open" />
                <Picker.Item label="close" value="close" />
                <Picker.Item label="on hold" value="on hold" />
              </Picker>
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>Condition: </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.state.condition + ''}
                editable={this.state.editable}
                autoFocus={this.state.autoFocus}
                onChangeText={this.updateField.bind(this, 'Condition')}
              />
            </View>
            <View style={styles.cellStyle}>
              <Text>Price: </Text>
              <TextInput
                style={styles.priceInput}
                defaultValue={this.state.price + ''}
                editable={this.state.editable}
                autoFocus={this.state.autoFocus}
                onChangeText={this.updateField.bind(this, 'Price')}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => Communications.email([this.state.email], null, null, message, '- Sent from EZTextbook')}>
            <View style={styles.holder}>
              <Text style={styles.text}>{`Email ${role}`}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => Communications.text(this.state.phone, message)}>
            <View style={styles.holder}>
              <Text style={styles.text}>SMS Message</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.markSpam.bind(this)}>
            <View style={styles.holder}>
              <Text style={styles.text}>Mark as Spam</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.addToList.bind(this)}>
            <View style={styles.holder}>
              <Text style={styles.text}>Add to Interest List</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonStyle, this.state.hide ? styles.hidden : {}]} onPress={this.editPost.bind(this)}>
            <View style={styles.holder}>
              <Text style={styles.text}>{this.state.update}</Text>
            </View>
          </TouchableOpacity>
      </Card>
    )
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
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
    height: 35,
    width: 200,
    fontSize: 13
  },
  priceInput: {
    height: 35,
    width: 200,
    fontSize: 13,
    color: 'red'
  },
  cellStyle: {
    flexDirection: 'column'
  },
};

export default ViewPost;
