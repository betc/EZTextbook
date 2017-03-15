import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ButtonSection from './ButtonSection';
import Button from './Button';

class PostDetail extends Component {
  render() {
    const { title, description, book, price, condition, status, dateCreated, type } = this.props.post;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      priceTextStyle
    } = styles;

    const role = type === "Buying" ? "Buyer" : "Seller";

  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text style={headerTextStyle}>{description}</Text>
          <Text style={headerTextStyle}>{status}</Text>
          <Text style={headerTextStyle}>Condition: {condition}</Text>
          <Text style={priceTextStyle}>CDN ${price}</Text>
        </View>
      </CardSection>

      <ButtonSection>
        <Button>
          Contact {role}
        </Button>
      </ButtonSection>
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

export default PostDetail;
