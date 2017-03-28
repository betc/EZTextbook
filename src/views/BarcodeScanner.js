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
	                onPress={this.scanAgain.bind(this)}
	                style={styles.afterScan}>
	                <Text>Book Not Found. Press Here To Scan Another Barcode</Text>
	            </TouchableOpacity>
	        </View>
        )
	} else {
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
	  <View>
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
}


const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: 'row',
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "transparent",
  },
  preview: {
	flex: 1,
	justifyContent: 'flex-end',
	alignItems: 'center'
  },
  afterScan: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#FFF',
  },
  scanButton: {
    height: 50,
    width: 300,
    backgroundColor: '#48BBEC',
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 3,
    marginRight: 3,
    justifyContent: 'center',
    borderRadius: 6,
  }

});

export default BarcodeScanner;
