import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  PanResponder,
} from 'react-native'

import styles from './styles'

const fbImage =
  'https://graph.facebook.com/10155639858650271/picture?height=500'

export default class Card extends Component {
  componentWillMount() {
    this.pan = new Animated.ValueXY()
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y },
      ]),
      onPanResponderRelease: () =>
        Animated.spring(this.pan, {
          toValue: { x: 0, y: 0 },
          friction: 4.5,
        }).start(),
    })
  }

  render() {
    const rotateCard = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['10deg', '0deg', '-10deg'],
    })
    const animatedStyles = {
      transform: [
        { translateX: this.pan.x },
        { translateY: this.pan.y },
        { rotate: rotateCard },
      ],
    }

    return (
      <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[styles.container, animatedStyles]}
      >
        <Image style={styles.image} source={{ uri: fbImage }} />
        <View style={styles.info}>
          <Text style={styles.name}>Ginta, 30</Text>
          <Text style={styles.position}>supermodel</Text>
        </View>
      </Animated.View>
    )
  }
}
