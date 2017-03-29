import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class CardHeader extends Component {
  render() {
    return (
      <View style={this.props.footer ? styles.footerWrapper : styles.headerWrapper}>
        <Text style={[styles.card, this.props.footer ? styles.footer : styles.header]}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

export class H1 extends Component {
  render() {
    return (
      <Text style={styles.h1}>{this.props.children}</Text>
    );
  }
}

export class H2 extends Component {
  render() {
    return (
      <Text style={styles.h2}>{this.props.children}</Text>
    );
  }
}

export class H3 extends Component {
  render() {
    return (
      <Text style={styles.h3}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    fontSize: 12,
    fontFamily: 'sans-serif-medium',
    color: '#ffcc00',
    // margin: 3,
    padding: 3,
    fontWeight: 'bold',
    borderColor: '#ddd',
  },
  header: {
    textAlign: 'right',
    borderBottomWidth: 1.2,
  },
  footer: {
    color: '#ff471a',
    fontSize: 15,
    paddingTop: 2,
    padding: 5,
    textAlign: 'left',
    fontWeight: '300',
    borderTopWidth: 0.2,
  },
  headerWrapper: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#404040'
  },
  // footerWrapper: {
  //   borderBottomLeftRadius: 5,
  //   borderBottomRightRadius: 5,
  //   backgroundColor: '#404040'
  // },
  h1: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#000',
    margin: 3,
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#808080',
    margin: 3,
    fontWeight: 'bold'
  },
  h3: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
    margin: 3,
    fontWeight: 'bold'
  }
});
