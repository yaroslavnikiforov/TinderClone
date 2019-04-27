import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Animated, PanResponder } from "react-native";
import styles from "./styles";

export default class SimpleScroller extends Component {
  static propTypes = {
    screen: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  };

  constructor(props) {
    super(props);

    this.pan = new Animated.Value(0);

    this.scrollResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: this.pan }]),
      onPanResponderRelease: () => {
        Animated.spring(this.pan, {
          toValue: 0
        }).start();
      }
    });
  }

  render() {
    const { screen } = this.props;

    const animatedStyles = {
      transform: [{ translateX: this.pan }]
    };

    return (
      <Animated.View
        style={[styles.scroller, animatedStyles]}
        {...this.scrollResponder.panHandlers}
      >
        {screen}
      </Animated.View>
    );
  }
}
