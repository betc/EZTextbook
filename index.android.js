import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Entrance from './src/views/Entrance';

export default class EZTextbook extends Component {
  render() {
    return (
      <Entrance />
    );
  };
}

AppRegistry.registerComponent('EZTextbook', () => EZTextbook);
