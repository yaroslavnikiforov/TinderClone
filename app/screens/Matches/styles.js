import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },

  row: {
    flexDirection: "row",
    backgroundColor: "white"
  },

  info: {
    justifyContent: "center",
    marginLeft: 10
  },

  name: {
    fontSize: 18
  },

  bio: {
    fontSize: 15,
    color: "darkgrey"
  },

  separator: {
    height: 1,
    marginLeft: 100,
    marginBottom: 15,
    backgroundColor: "whitesmoke"
  }
});

export default styles;
