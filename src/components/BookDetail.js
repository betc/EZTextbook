import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ButtonSection from './ButtonSection';
import Button from './Button';
import ApiUtils from '../ApiUtils.js';

// const BookDetail = ({ book }) => {
class BookDetail extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      token: ""
    };
  }

  componentWillMount() {
    ApiUtils.getToken('Login_Token').then((res) => {
      this.setState({
        token: res
      });
    })
  }

  viewPosts() {
    console.log("I am viewPosts");
    const bookId = this.props.book._id;
    console.log('Book id is ' + bookId);
    console.log('Token is ' + this.state.token);
    fetch(`https://eztextbook.herokuapp.com/api/post/search/criteria?token=${this.state.token}&book=${bookId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({posts: responseJson});
        console.log(this.state.posts);
        this.props.navigator.push({id: "ViewPosts", props: { posts: this.state.posts, navigator: this.props.navigator}})
      })
      .catch((error) => {
        console.error(error);
      });
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
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: imgUrl }}
          />
        </View>
        <View style={bookContentStyle}>
          <Text style={bookTitle}>{title}</Text>
          <View style={priceStyle}>
            <Text style={dealer}>Amazon: </Text>
            <Text style={bookPrice}> ${amazon}</Text>
          </View>
          <View style={priceStyle}>
            <Text style={dealer}>UW BookStore: </Text>
            <Text style={bookPrice}> ${uwbook}</Text>
          </View>
          <View style={priceStyle}>
            <Text style={dealer}>Feds Used Books: </Text>
            <Text style={bookPrice}> ${feds}</Text>
          </View>
        </View>
      </CardSection>

      <ButtonSection>
        <Button onPress={this.viewPosts.bind(this)}>
          View Posts
        </Button>
      </ButtonSection>
      <ButtonSection>
        <Button onPress={() => this.props.navigator.push({id: "Post", props: { title: title, book: _id, navigator: this.props.navigator}})}>
          Make a Post
        </Button>
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
