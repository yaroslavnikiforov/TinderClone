import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  PanResponder,
} from 'react-native'

const fbImage =
  'https://graph.facebook.com/10155639858650271/picture?height=500'

export default class App extends Component {
  componentWillMount() {
    this.pan = new Animated.ValueXY()
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y },
      ]),
      onPanResponderRelease: (e, gesture) =>
        console.log('Released', gesture.moveY),
    })
  }

  render() {
    const animatedStyle = {
      transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }],
    }

    return (
      <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[styles.card, animatedStyle]}
      >
        <Image style={styles.img} source={{ uri: fbImage }} />
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 20 }}>Ginta, 30</Text>
          <Text style={{ fontSize: 15, color: 'darkgrey' }}>supermodel</Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 100,
    marginHorizontal: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },

  img: {
    flex: 1,
  },

  infoContainer: {
    margin: 20,
  },
})
