import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const gutter = 25;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    overflow: "hidden",
    justifyContent: "center",
    width: width - 2 * gutter,
    height: 0.6 * height,
    marginHorizontal: gutter,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8
  },

  image: {
    flex: 0.9
  },

  info: {
    flex: 0.1,
    margin: 20
  },

  name: {
    fontSize: 20
  },

  bio: {
    color: "darkgrey",
    fontSize: 15
  }
});

export default styles;
