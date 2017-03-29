import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';

export default class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enlarge: false,
    };
  }

  render() {
    var {height, width} = Dimensions.get('window');
    console.log(width);
    return (
      <TouchableOpacity onPress={() => this.setState({enlarge: !this.state.enlarge})}>
        <View style={this.state.enlarge ? styles.largeImageWrapper : null}>
          <Image
            style={this.state.enlarge ? {borderRadius: 10, height: width, width: width-20} : styles.image}
            source={{uri: this.props.url}}
          />
        </View>
      </TouchableOpacity>
    );
    // return (
    //   <Lightbox>
    //     <Image
    //       style={{ height: 300 }}
    //       source={{ uri: this.props.url }}
    //     />
    //   </Lightbox>
    // );
  }
}

const styles = {
  largeImageWrapper: {
    // position: 'absolute',
    // top: 10, bottom: 10, left: 0, right: 0,
    // width: 170,
    // height: 170
  },
  largeImage: {
    // flex: 1,
    // resizeMode: "stretch",
    borderRadius: 10,
    width: 270,
    height: 270
  },
  image: {
    borderRadius: 10,
    width: 70,
    height: 70
  }
};
