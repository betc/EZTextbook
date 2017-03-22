import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ButtonSection from './ButtonSection';
import Button from './Button';

// const BookDetail = ({ book }) => {
class BookDetail extends Component {
  render() {
    const { title, thumbnail} = this.props.book;
    const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    priceTextStyle
  } = styles;
  const imgUrl = thumbnail === '' ? "https://www.littlebrown.co.uk/assets/img/newsletter_placeholder.jpg" : thumbnail;
  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: imgUrl }}
          />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
      </CardSection>

      <ButtonSection>
        <Button>
          Buy Now
        </Button>
      </ButtonSection>
      <ButtonSection>
        <Button onPress={() => this.props.navigator.push({id: "Post", props: { title: title}})}>
          Make a Post
        </Button>
      </ButtonSection>
      <ButtonSection>
        <Button onPress={() => Linking.openURL(url)}>
          Compare to Amazon
        </Button>
      </ButtonSection>
    </Card>
  );
};
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 0.8
  },
  headerTextStyle: {
    fontSize: 13
  },
  priceTextStyle: {
    fontSize: 13,
    color: 'red'
  },
  thumbnailStyle: {
    height: 100,
    width: 80
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  }
};

export default BookDetail;
