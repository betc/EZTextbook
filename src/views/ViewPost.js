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
            <Text style={headerTextStyle}>{type}</Text>
            <Text style={headerTextStyle}>{this.state.firstname} {this.state.lastname}</Text>
            <Text style={headerTextStyle}>{title}</Text>
            <Text style={headerTextStyle}>{description}</Text>
            <Text style={headerTextStyle}>{status}</Text>
            <Text style={headerTextStyle}>Condition: {condition}</Text>
            <Text style={priceTextStyle}>CDN ${price}</Text>
          </View>

          <TouchableOpacity onPress={() => Communications.email([this.state.email], null, null, message, '- Sent from EZTextbook')}>
            <View style={styles.holder}>
              <Text style={styles.text}>{`Email ${role}`}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Communications.text(this.state.phone, message)}>
            <View style={styles.holder}>
              <Text style={styles.text}>SMS Message</Text>
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
  }
};

export default ViewPost;
