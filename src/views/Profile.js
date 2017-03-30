import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Alert,
  ScrollView,
  ToastAndroid
} from 'react-native';
import { IconButton, Button } from '../components/Buttons';
import { H1, H2, H3 } from '../components/Headings';
import Card from '../components/Card';
import axios from 'axios';
import ApiUtils from '../ApiUtils.js';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      welcomeName: '',
      profile: [],
      rating: "100",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      editable: false,
      autoFocus: false,
      update: "Update Profile",
      token: ""
    };
  }

  componentDidMount() {
    ApiUtils.getToken('Login_Token').then((res) => {
      this.setState({token: res});
      axios.get('https://eztextbook.herokuapp.com/api/user/profile?', {
        params: {
        token: this.state.token
        }
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            rating: response.data.rating,
            welcomeName: response.data.firstname,
            firstName: response.data.firstname,
            lastName: response.data.lastname,
            email: response.data.local.email,
            mobile: response.data.phone
          })
          ApiUtils.setToken('userName', this.state.firstName + ' ' + this.state.lastName);
          ApiUtils.setToken('userId', response.data._id);
        }
      })
    })
  }

  updateField(fieldName, event) {
    if (fieldName == 'First Name') {
      this.setState({
        firstName: event
      })
    } else if (fieldName == 'Last Name') {
      this.setState({
        lastName: event
      })
    } else {
      this.setState({
        mobile: event
      })
    }
  }

  updateProfile() {
    const nameRegex = /[A-Za-z][A-Za-z]*/;
    if (this.state.update == "Update Profile") {
      this.setState({
        update: "Save Change",
        editable: true,
        autoFocus: true
      });
    } else {
      if (!nameRegex.test(this.state.firstName) || !nameRegex.test(this.state.lastName)) {
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        Alert.alert('Name field is invalid');
      } else {
        const url = 'https://eztextbook.herokuapp.com/api/user/profile/update?token=' + this.state.token;
        axios.post(url, {
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          phone: this.state.mobile
        })
        .then(function(response){
          // this.setState({welcomeName: this.state.firstName});
          ToastAndroid.show('Profile updated.', ToastAndroid.SHORT);
        });
        this.setState({
          update: "Update Profile",
          editable: false,
          autoFocus: false
        });
      }
    }
  }

  render() {

    return (
      <ScrollView style={styles.containerStyle}>
      <H1>
        Welcome {this.state.welcomeName}!
      </H1>
      <H2>
        Rating: {this.state.rating}
      </H2>
      <H1>
        {'\n'}General Information:
      </H1>
      <View style={styles.cellStyle}>
        <H2>
          First Name:
        </H2>
        <TextInput
          style={styles.generalInputStyle}
          defaultValue={this.state.firstName}
          editable={this.state.editable}
          autoFocus={this.state.autoFocus}
          onChangeText={this.updateField.bind(this, 'First Name')}
        />
      </View>
      <View style={styles.cellStyle}>
        <H2>
          Last Name:
        </H2>
        <TextInput
          style={styles.generalInputStyle}
          defaultValue={this.state.lastName}
          editable={this.state.editable}
          autoFocus={this.state.autoFocus}
          onChangeText={this.updateField.bind(this, 'Last Name')}
        />
      </View>
      <H1>
        Contact Information:
      </H1>
      <View style={styles.cellStyle}>
        <H2>
          Email address:
        </H2>
        <TextInput
          style={styles.contactInputStyle}
          defaultValue={this.state.email}
          editable={false}
        />
      </View>
      <View style={styles.cellStyle}>
        <H2>
          Mobile number:
        </H2>
        <TextInput
          style={styles.contactInputStyle}
          defaultValue={this.state.mobile}
          editable={this.state.editable}
          autoFocus={this.state.autoFocus}
          onChangeText={this.updateField.bind(this, 'Mobile')}
        />
      </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
          <IconButton
            title={this.state.update}
            icon={'pencil'}
            onPress={this.updateProfile.bind(this)}
          />
          <IconButton
            title={'View Interests List'}
            icon={'star'}
            onPress={ () =>
              this.props.navigator.push({
                id: 'ViewPosts',
                props: {criteria: {wishlist: true}, navigator: this.props.navigator}
            })}
          />
          <IconButton
            title={'View My Posts'}
            icon={'list-ul'}
            onPress={ () =>
              this.props.navigator.push({
                id: 'ViewPosts',
                props: {criteria: {user: true}, navigator: this.props.navigator}
            })}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    // flex: 1,
    marginTop: 10,
    // marginLeft: 10,
    padding: 10,
  },
  imageStyle: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 0.5,
    borderRadius: 75,
    borderColor: '#800080'
  },
  ratingStyle: {
    color: '#550080',
    fontWeight: '600',
    // alignSelf: 'center'
  },
  headingStyle: {
    marginTop: 5,
    color: '#550080',
    fontSize: 20,
    fontWeight: '700',
    // alignSelf: 'center'
  },
  cellStyle: {
    // alignSelf: 'center',
    // flexDirection: 'row',
    // marginLeft: 30,
  },
  textStyle: {
    paddingRight: 30,
    // alignSelf: 'center',
    fontSize: 15,
    fontWeight: '800'
  },
  generalInputStyle: {
    marginTop: 5,
    fontWeight: '800',
    height: 35,
    width: 80
  },
  contactInputStyle: {
    marginTop: 5,
    fontWeight: '800',
    height: 35,
    width: 200,
  },
  button: {
    height: 35,
    width: 220,
    backgroundColor: '#48BBEC',
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
    alignSelf: 'center'
  }
});

export default Profile;
