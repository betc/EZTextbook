import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Alert,
   ScrollView,
} from 'react-native';
import Camera from 'react-native-camera';
import ApiUtils from '../ApiUtils';
import BookDetail from '../components/BookDetail';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import ButtonSection from '../components/ButtonSection';
import { Button } from '../components/Buttons';
import Header from '../components/Header'

class BarcodeScanner extends Component {
  constructor(props) {
	super(props);
    this.state = {
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
  setBook(book) {
    this.setState({book});
  }

  renderBook() {
	ApiUtils.getToken('Login_Token').then((token) => {
		fetch('https://eztextbook.herokuapp.com/api/book/search/criteria?isbn='+ this.state.barcode +'&token='+ token)
		.then(ApiUtils.checkStatus)
		.then(response => response.json())
		.then((responseJson) => {
		    console.log(responseJson);
			if (responseJson.success !== false) {
			/*	this.setState({
				  book: responseJson
				}) */
				this.setBook(responseJson);
			}
		})
		.catch(error =>
				 console.log("in BookList._onBarCodeScan, error: "+error)
		)
	});
	if (this.state.book === '') {
	    return (
	        <View>
	            <Text style={styles.afterScanText}>Sorry, We Couldn't Find That Textbook</Text>
	        </View>
        )
	} else {
	 //   return (this.renderScannedBook.bind(this));
	/* this.props.navigator.replace({
          id: 'BookDetail',
          props:{ book: this.state.book, navigator: this.props.navigator}
      });*/
	  return <BookDetail style={styles.viewBook} book={this.state.book} navigator={this.props.navigator}/>
	}
  }

  scanAgain() {
	this.setState({barcode: '', book: ''});
  }

  renderBarcode() {
	if (this.state.barcode == '') {
	  return (
		<Camera
			ref="cam"
			style={styles.container}
			onBarCodeRead={this.BarCodeRead.bind(this)}
			type={Camera.constants.Type.back}
			defaultTouchToFocus>
		</Camera>
	  )
	} else {
	  return (
	  <View style={styles.content}>
	  <ScrollView>
		{this.renderBook()}
	  </ScrollView>
	  <View style={styles.container}>
	  <Button
	     onPress={this.scanAgain.bind(this)}>
	     Scan Again?
	  </Button>
	  </View>
	  </View>
	  )
	}
  }

  render() {
	return (
		this.renderBarcode()
	);
  }

}


const styles = StyleSheet.create({
  container: {
	flex: 1,
//	flexDirection: 'row',
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "transparent",
  },
  content: {
    height: 500,
  //  width: 300,
    justifyContent: 'center',
  //  alignItems: 'stretch',
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
    color: 'black',
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
    },
    viewBook: {
      marginTop: 200,
      alignSelf: 'stretch',
    }


});

export default BarcodeScanner;
