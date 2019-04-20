import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { Facebook } from "expo";
import { View } from "react-native";

import FacebookButton from "../../components/FacebookButton";

import styles from "./styles";

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FacebookButton onPress={this._login} />
      </View>
    );
  }

  _authenticate = token => {
    const provider = firebase.auth.FacebookAuthProvider;
    const credential = provider.credential(token);

    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  };

  _login = async () => {
    const APP_ID = "2182360415187709";
    const options = { permissions: ["public_profile", "email"] };
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      APP_ID,
      options
    );

    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      console.log(await response.json());

      this._authenticate(token);
    }
  };
}

export default Login;
