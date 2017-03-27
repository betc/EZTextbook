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

    componentWillMount() {
        console.log("before rendering Barcode Scanner. this.props is: "+ this.props)
        console.log("before rendering Barcode Scanner. this.props.navigator is: "+ this.props.navigator)

    }
 
  barcodeReceived(code) {
        console.log("this.props is: " + this.props)
		alert("Barcode Scanned!",  "ISBN: " + code.data);
		ApiUtils.getToken('Login_Token').then((token) => {
			fetch('https://eztextbook.herokuapp.com/api/book/search/criteria?isbn='+ code.data +'&token='+ token)
			.then(ApiUtils.checkStatus)
			.then(response => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				if(responseJson === null) {

					alert("Sorry, we couldn't find that book in our database")
					this.props.navigator.pop(); //replace({id: 'Home'});
				} else {

					let temp = [];
					temp.push(responseJson);

					this.setState({books: temp});
					console.log(temp);
				}
				this.props.navigator.push({id: 'Search' , props: {books: this.state.books, navigator: this.props.navigator}} );
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
                onBarCodeRead={this.barcodeReceived.bind(this)}
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

