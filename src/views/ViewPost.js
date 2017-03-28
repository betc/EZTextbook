import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, Linking, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
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

  componentWillMount() {
    console.log(this.props);
    this.setState({
      title: this.props.title,
      description: this.props.description,
      status: this.props.status,
      condition: this.props.condition,
      price: this.props.price,
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
          console.log(responseJson);
          const interestsList = [];
          for(i = 0; i < responseJson.length; i++) {
            interestsList.push(responseJson[i]._id);
          }
          this.setState({
            inWishList: interestsList.indexOf(this.props._id) !== -1
          });
          console.log(interestsList);
          console.log(this.props._id);
          console.log(this.state.inWishList);
          this.setState({
            interestsListButton: this.state.inWishList ? 'Delete from Interest List' : 'Add To Interest List'
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
        console.log(responseJson);
        Alert.alert('Post deleted from your interest list');
        this.setState({
          inWishList: false,
          interestsListButton: 'Add To Interest List'
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
        console.log(responseJson);
        Alert.alert('Post added to your interest list');
        this.setState({
          inWishList: true,
          interestsListButton: 'Delete From Interest List'
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
    let images = this.state.images.map((url) => {
      return <Image key={url} style={styles.image} source={{uri: `https://eztextbook.herokuapp.com/images/${url}?token=${this.state.token}`}} />;
    });
    return (
      <Card>
          <ScrollView style={styles.headerContentStyle}>
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
              <Text style={headerTextStyle}>User Rating: </Text>
              <TextInput
                style={styles.input}
                defaultValue={creator.rating + ''}
                editable={false}
                autoFocus={false}
              />
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>Book Title: </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.props.book.title}
                editable={false}
                autoFocus={false}
              />
            </View>
            <View style={styles.cellStyle}>
              <Text style={headerTextStyle}>Post Title: </Text>
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
              <Picker
                enabled={this.state.editable}
                selectedValue={this.state.status}
                onValueChange={(val) => this.setState({status: val})}>
                <Picker.Item label="open" value="Open" />
                <Picker.Item label="closed" value="Closed" />
                <Picker.Item label="on hold" value="On hold" />
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
            <View style={{flexDirection:'row', flexWrap:'wrap', marginBottom: 20}}>
              {images}
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
          <TouchableOpacity style={styles.buttonStyle} onPress={this.modifyInterestsList.bind(this)}>
            <View style={styles.holder}>
              <Text style={styles.text}>{this.state.interestsListButton}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonStyle, this.state.hide ? styles.hidden : {}]} onPress={this.editPost.bind(this)}>
            <View style={styles.holder}>
              <Text style={styles.text}>{this.state.update}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Card>
    )
  }
}

const styles = {
  headerContentStyle: {
    marginBottom: 5
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
    color: 'red'
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
