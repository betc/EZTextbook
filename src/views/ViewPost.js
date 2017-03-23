import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Picker, ProgressBarAndroid, Linking } from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import ButtonSection from '../components/ButtonSection';
import Button from '../components/Button';

class ViewPost extends Component {

  render() {
    const { title, description, creator, book, price, condition, status, dateCreated, type } = this.props;

    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      priceTextStyle
    } = styles;

    return (
      <Card>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{type}</Text>
            <Text style={headerTextStyle}>sdfsdf</Text>
            <Text style={headerTextStyle}>{title}</Text>
            <Text style={headerTextStyle}>{description}</Text>
            <Text style={headerTextStyle}>{status}</Text>
            <Text style={headerTextStyle}>Condition: {condition}</Text>
            <Text style={priceTextStyle}>CDN ${price}</Text>
          </View>

        <ButtonSection>
          <Button onClick={() => Linking.openURL('mailto:somethingemail@gmail.com?subject=abcdefg&body=body')}>
            Contact
          </Button>
        </ButtonSection>

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
