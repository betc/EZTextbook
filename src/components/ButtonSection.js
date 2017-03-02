import React from 'react';
import { View } from 'react-native';

const ButtonSection = (props) => {
  return (
    <View style={styles.boxStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  boxStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default ButtonSection;
