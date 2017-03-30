import React from 'react';
import { View, Text } from 'react-native';
import { CardHeader } from './Headings';

const Card = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.header ? <CardHeader>{props.header}</CardHeader> : null}
      {props.children}
      {props.footer ? <CardHeader footer={true}>{props.footer}</CardHeader> : null}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export default Card;
