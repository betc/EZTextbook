import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ButtonSection from './ButtonSection';
import Button from './Button';

const BookDetail = ({ book }) => {
  const { title, author, price, thumbnail_image, url } = book;
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    priceTextStyle
  } = styles;
  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: thumbnail_image }}
          />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text style={headerTextStyle}>{author}</Text>
          <Text style={priceTextStyle}>CDN{price}</Text>
        </View>
      </CardSection>

      <ButtonSection>
        <Button>
          Buy Now
        </Button>
      </ButtonSection>
      <ButtonSection>
        <Button>
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

export default BookDetail;
