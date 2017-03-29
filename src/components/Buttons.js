import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class IconButton extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress} style={this.props.style}>
        <View style={styles.iconButton}>
          <Text style={styles.iconButtonText}><Icon name={this.props.icon} /></Text>
          <Text style={styles.iconButtonText}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export class Button extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
};

export class ButtonSubmit extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={this.props.onPress} style={styles.buttonSubmit}>
        <Text style={styles.buttonSubmitText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  iconButton: {
    flex: 1,
    width: 100,
    backgroundColor: '#404040',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5,
    padding: 5
  },
  iconButtonText: {
    alignSelf: 'center',
    color: '#ffcc00',
    fontSize: 10,
    fontWeight: '600',
  },
  button: {
    flex: 1,
    backgroundColor: '#404040',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5
  },
  buttonText: {
    alignSelf: 'center',
    color: '#ffcc00',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonSubmit: {
    height: 50,
    backgroundColor: '#ffcc00',
    alignSelf: 'stretch',
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonSubmitText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center'
  }
});
