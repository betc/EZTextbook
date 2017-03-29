import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ButtonSection from './ButtonSection';
import { Button } from './Buttons';
import { H1, H2 } from './Headings';
import { IconButton } from './Buttons';

// const BookDetail = ({ book }) => {
class BookDetail extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  render() {
    const { _id, title, thumbnail, feds, uwbook, amazon} = this.props.book;
    const {
    thumbnailStyle,
    bookContentStyle,
    thumbnailContainerStyle,
    bookTitle,
    priceStyle,
    dealer,
    bookPrice
  } = styles;
  const imgUrl = thumbnail === '' ? "https://www.littlebrown.co.uk/assets/img/newsletter_placeholder.jpg" : thumbnail;
  return (
    <Card header={'TEXTBOOK'}>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: imgUrl }}
          />
        </View>
        <View style={bookContentStyle}>
          <H2>{title}</H2>
          <View style={priceStyle}>
            <Text style={dealer}>Amazon: </Text>
            <Text style={bookPrice}> {amazon !== 0 ? '$'+amazon : 'n/a'}</Text>
          </View>
          <View style={priceStyle}>
            <Text style={dealer}>UW BookStore: </Text>
            <Text style={bookPrice}> {uwbook !== 0 ? '$'+uwbook : 'n/a'}</Text>
          </View>
          <View style={priceStyle}>
            <Text style={dealer}>Feds Used Books: </Text>
            <Text style={bookPrice}> {feds !== 0 ? '$'+feds : 'n/a'}</Text>
          </View>
        </View>
      </CardSection>

      <ButtonSection>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
          <IconButton
            title={'View Posts'}
            icon={'list-ul'}
            onPress={() =>
              this.props.navigator.push({
                id: 'ViewPosts',
                props: {criteria: {bookid: _id}, navigator: this.props.navigator}
            })}
          />
          <IconButton
            title={'Make a Post'}
            icon={'pencil-square'}
            onPress={() => this.props.navigator.push({
              id: 'Post',
              props: { title: title, book: _id, navigator: this.props.navigator}
            })}
          />
        </View>
      </ButtonSection>
    </Card>
  );
};
}

const styles = {
  bookContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 0.8
  },
  bookTitle: {
    fontWeight: '500',
    color: '#4169e1'
  },
  priceStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  dealer: {
    fontWeight: '600',
    color: '#999'
  },
  bookPrice: {
    color: '#c40000'
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
