import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Alert
} from 'react-native';
import Camera from 'react-native-camera';
import ApiUtils from '../ApiUtils';
import BookDetail from '../components/BookDetail';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import ButtonSection from '../components/ButtonSection';
import Button from '../components/Button';

class BarcodeScanner extends Component {
  constructor(props) {
	super(props);
    this.state = {
	  barcode: '',
		book: ''
    };
  }
  BarCodeRead(e) {
	console.log("onBarcodeRead:")
	console.log(e);
	this.setState({barcode: e.data});
	console.log(e.data);
    Alert.alert(
      "Barcode Found! \nData: " + e.data
    );
  }

  renderBook() {
	ApiUtils.getToken('Login_Token').then((token) => {
		fetch('https://eztextbook.herokuapp.com/api/book/search/criteria?isbn='+ this.state.barcode +'&token='+ token)
		.then(ApiUtils.checkStatus)
		.then(response => response.json())
		.then((responseJson) => {
			if (responseJson.success !== false) {
				this.setState({
				  book: responseJson
				})
			}
		})
		.catch(error =>
				 console.log("in BookList._onBarCodeScan, error: "+error)
		)
	});
	if (this.state.book === '') {
	    return (
	        <View style={styles.scanButton}>
	            <TouchableOpacity
	                onPress={this.scanAgain.bind(this)}>
	                <Text style={styles.afterScanText}>Book Not Found. Press Me To Scan Another Barcode</Text>
	            </TouchableOpacity>
	        </View>
        )
	} else {
	 //   return (this.renderScannedBook.bind(this));
	/* this.props.navigator.replace({
          id: 'BookDetail',
          props:{ book: this.state.book, navigator: this.props.navigator}
      });*/
	  return <BookDetail book={this.state.book} navigator={this.props.navigator}/>
	}
  }

  scanAgain() {
	this.setState({barcode: ''});
  }

  renderBarcode() {
	if (this.state.barcode == '') {
	  return (
		<Camera
			ref="cam"
			style={styles.container}
			onBarCodeRead={this.BarCodeRead.bind(this)}
			type={Camera.constants.Type.back}>
		</Camera>
	  )
	} else {
	  return (
	  <View style={styles.content}>
		{this.renderBook()}
	  </View>
	  )
	}
  }

  render() {
	return (
		this.renderBarcode()
	);
  }

  renderScannedBook() {
      const { _id, title, thumbnail, feds, uwbook, amazon} = this.state.book;
      const imgUrl = thumbnail === '' ? "https://www.littlebrown.co.uk/assets/img/newsletter_placeholder.jpg" : thumbnail;
      return (
        <Card>
          <CardSection>
            <View style={styles.thumbnailContainerStyle}>
              <Image
                style={styles.thumbnailStyle}
                source={{ uri: imgUrl }}
              />
            </View>
            <View style={styles.bookContentStyle}>
              <Text style={styles.bookTitle}>{title}</Text>
              <View style={styles.priceStyle}>
                <Text style={styles.dealer}>Amazon: </Text>
                <Text style={styles.bookPrice}> ${amazon}</Text>
              </View>
              <View style={styles.priceStyle}>
                <Text style={styles.dealer}>UW BookStore: </Text>
                <Text style={styles.bookPrice}> ${uwbook}</Text>
              </View>
              <View style={styles.priceStyle}>
                <Text style={styles.dealer}>Feds Used Books: </Text>
                <Text style={styles.bookPrice}> ${feds}</Text>
              </View>
            </View>
          </CardSection>

          <ButtonSection>
            <Button onPress={() =>
              this.props.navigator.push({
                id: 'ViewPosts',
                props: {criteria: {bookid: _id}, navigator: this.props.navigator}
            })}>
              View Posts
            </Button>
          </ButtonSection>
          <ButtonSection>
            <Button onPress={() => this.props.navigator.push({
              id: 'Post',
              props: { title: title, book: _id, navigator: this.props.navigator}
            })}>
              Make a Post
            </Button>
          </ButtonSection>
        </Card>
      );
  }


}


const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: 'row',
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "transparent",
  },
  content: {
    height: 500,
  //  width: 300,
    justifyContent: 'center',
  //  alignItems: 'center',
   // backgroundColor: '#FFFFFF',
   paddingBottom: 200,
  },
  preview: {
	flex: 1,
	justifyContent: 'flex-end',
	alignItems: 'center'
  },
  afterScan: {
    alignSelf: 'center',
    color: '#FFF',
  },
  scanButton: {
    height: 110,
    width: 250,
    backgroundColor: '#48BBEC',
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    borderRadius: 6,
  },
  afterScanText: {
    padding: 10,
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
  },
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


});

export default BarcodeScanner;
