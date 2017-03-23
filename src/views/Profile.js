import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      firstName: "",
      lastName: "",
      email: "",
      mobile: "519-999-8888",
      editable: false,
      autoFocus: false,
      update: "Update Profile",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDNlMTRjNGUzN2ZhMDAwNGNjNzFlMSIsImlhdCI6MTQ5MDI4NjQ4M30.miLJ-HQB9RCdvzl8XtqB7I0I2wk709nqUXsajA6BQgE"
    };
  }

  componentWillMount() {
    axios.get('https://eztextbook.herokuapp.com/api/user/profile?', {
      params: {
        token: this.state.token
      }
    }).then((response) => {
        if (response.status === 200) {
          this.setState({
            firstName: response.data.firstname,
            lastName: response.data.lastname,
            email: response.data.local.email
          })
        }
      })
  }

  handleChange(event) {
    // todo
  }

  updateProfile() {
    if (this.state.update == "Update Profile") {
      this.setState({
        update: "Save Change",
        editable: true,
        autoFocus: true
      });
    } else {
      this.setState({
        update: "Update Profile",
        editable: false,
        autoFocus: false
      });
    }
  }

  changePassword() {
    // todo
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Image
          source={require('../../img/profile.jpg')}
          style={styles.imageStyle}
        />
        <Text style={styles.headingStyle}>
          General Information:
        </Text>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            First Name:
          </Text>
          <TextInput
            style={styles.generalInputStyle}
            defaultValue={this.state.firstName}
            editable={this.state.editable}
            autoFocus={this.state.autoFocus}
            onChangeText={this.handleChange.bind(this)}
          />
        </View>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            Last Name:
          </Text>
          <TextInput
            style={styles.generalInputStyle}
            defaultValue={this.state.lastName}
            editable={this.state.editable}
            autoFocus={this.state.autoFocus}
            onChangeText={this.handleChange.bind(this)}
          />
        </View>
        <Text style={styles.headingStyle}>
          Contact Information:
        </Text>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            Email address:
          </Text>
          <TextInput
            style={styles.contactInputStyle}
            defaultValue={this.state.email}
            editable={this.state.editable}
            autoFocus={this.state.autoFocus}
            onChangeText={this.handleChange.bind(this)}
          />
        </View>
        <View style={styles.cellStyle}>
          <Text style={styles.textStyle}>
            Mobile number:
          </Text>
          <TextInput
            style={styles.contactInputStyle}
            defaultValue={this.state.mobile}
            editable={this.state.editable}
            autoFocus={this.state.autoFocus}
            onChangeText={this.handleChange.bind(this)}
          />
        </View>
        <TouchableHighlight style={styles.button} onPress={this.updateProfile.bind(this)}>
          <Text style={styles.buttonText}>
            {this.state.update}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.changePassword.bind(this)}>
          <Text style={styles.buttonText}>
            Change Password
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 40
  },
  imageStyle: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 0.5,
    borderRadius: 75,
    borderColor: '#800080'
  },
  headingStyle: {
    marginTop: 10,
    color: '#550080',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center'
  },
  cellStyle: {
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row'
  },
  textStyle: {
    paddingRight: 30,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '800'
  },
  generalInputStyle: {
    height: 35,
    width: 80,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 2
  },
  contactInputStyle: {
    height: 35,
    width: 200,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 2
  },
  commentInputStyle: {
    marginTop: 10,
    marginBottom: 10,
    height: 100,
    borderWidth: 2,
    borderColor: '#550080'
  },
  button: {
    height: 50,
    width: 250,
    backgroundColor: '#48BBEC',
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '500',
    alignSelf: 'center'
  }
});

export default Profile;
