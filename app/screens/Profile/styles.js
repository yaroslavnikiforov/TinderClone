import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
    backgroundColor: "white"
  },

  profile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  firstName: {
    fontSize: 20
  },

  bio: {
    fontSize: 15,
    color: "darkgrey"
  },

  sliderWrapper: {
    alignItems: "center",
    alignSelf: "stretch"
  },

  labelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch"
  },

  rangeLabel: {
    color: "darkgrey"
  }
});

export default styles;
