import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import FacebookButton from "../../components/FacebookButton";

import styles from "./styles";

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FacebookButton
          onPress={() => console.log("facebook button pressed")}
        />
      </View>
    );
  }
}

export default Login;
