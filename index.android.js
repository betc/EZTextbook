import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/views/App';

export default class EZTextbook extends Component {
  render() {
    return (
      <App />
    );
  };
}

AppRegistry.registerComponent('EZTextbook', () => EZTextbook);
