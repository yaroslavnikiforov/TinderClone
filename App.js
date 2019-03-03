import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const fbImage =
  "https://graph.facebook.com/10155639858650271/picture?height=500";

export default class App extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.img} source={{ uri: fbImage }} />
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 20 }}>Ginta, 30</Text>
          <Text style={{ fontSize: 15, color: "darkgrey" }}>supermodel</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 100,
    marginHorizontal: 10,
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8
  },

  img: {
    flex: 1
  },

  infoContainer: {
    margin: 20
  }
});
