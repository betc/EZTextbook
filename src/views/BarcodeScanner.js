import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
   View,
} from 'react-native';
import Camera from 'react-native-camera';
import ApiUtils from '../ApiUtils';
 
class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      books: [],
    };
  }
 
  barcodeReceived(e) {
		//alert("Barcode Scanned!",  "ISBN: " + code.data);
		ApiUtils.getToken('Login_Token').then((token) => {
			fetch('https://eztextbook.herokuapp.com/api/book/search/criteria?isbn='+ code.data +'&token='+ token)
			.then(ApiUtils.checkStatus)
			.then(response => response.json())
			.then(res => {
				console.log("after barcode scan in BookList, re = :" + res)
				if(res === null) {
					alert("Sorry, we couldn't find that book in our database")
				} else {
					let temp = [];
					temp.push(res);
					this.setState({books: temp});
				}
				this.props.navigator.push({id: 'Search'});
			//	this.render();
			}).catch(error =>
				console.log("in BookList._onBarCodeScan, error: "+error)
			)
		})
  }
 
  render() {
    return (
      <View style={styles.container}>
            <Camera
                ref= {(cam) => {
                    this.camera = cam}
                }
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                onBarCodeRead={this.barcodeReceived}
                defaultTouchToFocus
                type={Camera.constants.Type.back}
            >
            </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }

});

export default BarcodeScanner;

