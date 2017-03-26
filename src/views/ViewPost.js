import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, ProgressBarAndroid, Linking, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import ButtonSection from '../components/ButtonSection';
import Button from '../components/Button';
import ApiUtils from '../ApiUtils'

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: null
    };
  }

  componentDidMount() {
    return ApiUtils.getToken('Login_Token').then((res) => {
      this.setState({token: res});
      // console.log('creator ' + this.props.creator)
      fetch(`https://eztextbook.herokuapp.com/api/user/visit/profile/${this.props.creator}?token=${this.state.token}`)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          this.setState({firstname: responseJson.firstname});
          this.setState({lastname: responseJson.lastname});
          this.setState({phone: responseJson.phone});
          this.setState({email: responseJson.local.email});
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  markSpam() {
    console.log("spam");
    console.log(this.state.token);
    console.log(this.props._id);
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
        console.log(responseJson);
    });
  }

  addToList() {
    console.log("added to Interest List");
  }

  render() {
    const { _id, title, description, creator, book, price, condition, status, dateCreated, type } = this.props;
    // this.setState({id: _id});


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
            <Text style={headerTextStyle}>Post Type: {type}</Text>
            <Text style={headerTextStyle}>Creator: {this.state.firstname} {this.state.lastname}</Text>
            <Text style={headerTextStyle}>Title: {title}</Text>
            <Text style={headerTextStyle}>Description: {description}</Text>
            <Text style={headerTextStyle}>Status: {status}</Text>
            <Text style={headerTextStyle}>Condition: {condition}</Text>
            <Text style={priceTextStyle}>Price: ${price}CAD</Text>
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
  priceTextStyle: {
    fontSize: 13,
    color: 'red'
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
  }
};

export default ViewPost;
