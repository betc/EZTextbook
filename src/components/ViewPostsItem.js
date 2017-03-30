import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ButtonSection from './ButtonSection';
import BookConditions from '../constants/BookConditions';
import Button from './Button';
import { H1, H2 } from '../components/Headings';

class ViewPostsItem extends Component {

  render() {
    const { _id, title, description, creator, book, price, condition, status, dateCreated, type } = this.props.post;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      priceTextStyle
    } = styles;

  return (
    <Card header={type.toUpperCase()} footer={'$'+price.toFixed(2).toString()}>
      <TouchableOpacity onPress={() => this.props.navigator.push({id: 'ViewPost', props: {...this.props.post}})}>
        <CardSection>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}><H1>{title}</H1></Text>
            <Text style={headerTextStyle}><H2>{book.title.trim()}</H2></Text>
            <Text style={headerTextStyle}>Status: {status}</Text>
            <Text style={headerTextStyle}>{BookConditions[condition]}</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    </Card>
  );
};
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

export default ViewPostsItem;
