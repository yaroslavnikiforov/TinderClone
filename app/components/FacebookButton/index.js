import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, View, Text } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from "./styles";

class FacebookButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  render() {
    const { onPress } = this.props;

    return (
      <TouchableHighlight
        style={styles.button}
        onPress={onPress}
        underlayColor="#3b5998"
        activeOpacity={0.8}
      >
        <View style={styles.container}>
          <Icon name={"facebook-f"} size={15} color={"white"} />
          <Text style={styles.label}>Login with Facebook</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default FacebookButton;
