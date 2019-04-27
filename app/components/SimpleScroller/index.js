import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

export default class SimpleScroller extends Component {
  static propTypes = {
    screens: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.pan = new Animated.Value(0);

    this.scrollResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.pan.setOffset(this.pan._value);
        this.pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, { dx: this.pan }]),
      onPanResponderRelease: () => {
        this.pan.flattenOffset();
        const move = Math.round(this.pan._value / width) * width;

        Animated.spring(this.pan, {
          toValue: move
        }).start();
      }
    });
  }

  render() {
    const { screens } = this.props;

    const animatedStyles = {
      transform: [{ translateX: this.pan }]
    };

    const scrollerWidth = screens.length + width;

    return (
      <Animated.View
        style={[styles.scroller, animatedStyles, { width: scrollerWidth }]}
        {...this.scrollResponder.panHandlers}
      >
        {screens.map((screen, index) => (
          <View key={index} style={{ width, height }}>
            {screen}
          </View>
        ))}
      </Animated.View>
    );
  }
}
