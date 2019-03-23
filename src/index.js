import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import Card from './Card'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card />
        <Card />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
