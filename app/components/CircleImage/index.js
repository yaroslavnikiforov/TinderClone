import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, PixelRatio } from "react-native";

class CircleImage extends Component {
  static propTypes = {
    size: PropTypes.number,
    id: PropTypes.string
  };

  render() {
    const { size, id } = this.props;
    const imageSize = PixelRatio.getPixelSizeForLayoutSize(size);
    const fbImage = `https://graph.facebook.com/${id}/picture?height=${imageSize}`;

    return (
      <Image
        source={{ uri: fbImage }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
}

export default CircleImage;
