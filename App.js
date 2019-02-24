import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class App extends Component {
  render() {
    return <View style={styles.card} />;
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8
  }
});
