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

class SimpleScroller extends Component {
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
      onPanResponderRelease: (e, { vx }) => {
        this.pan.flattenOffset();
        let move = Math.round(this.pan._value / width) * width;

        if (Math.abs(vx) > 0.25) {
          const direction = vx / Math.abs(vx);
          const scrollPosition =
            direction > 0
              ? Math.ceil(this.pan._value / width)
              : Math.floor(this.pan._value / width);

          move = scrollPosition * width;
        }

        const minScroll = (props.screens.length - 1) * -width;

        Animated.spring(this.pan, {
          toValue: this._clamp(move, minScroll, 0),
          bounciness: 0
        }).start();
      }
    });
  }

  _clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

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

export default SimpleScroller;
