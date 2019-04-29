import React, { Component } from "react";
import { Facebook } from "expo";
import { StackActions, NavigationActions } from "react-navigation";
import { View, ActivityIndicator } from "react-native";
import firebase from "firebase";
import FacebookButton from "../../components/FacebookButton";
import styles from "./styles";

class Login extends Component {
  state = {
    loading: true
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          <FacebookButton onPress={this._login} />
        )}
      </View>
    );
  }

  componentDidMount() {
    //firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.firebaseRef = firebase.database().ref("users");
        this.firebaseRef.child(auth.uid).on("value", snap => {
          const user = snap.val();

          if (user !== null) {
            this.firebaseRef.child(auth.uid).off("value");
            this._goHome(user);
          }
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  _goHome = user => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Home",
          params: { user }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _authenticate = token => {
    const provider = firebase.auth.FacebookAuthProvider;
    const credential = provider.credential(token);

    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  };

  _login = async () => {
    this.setState({ loading: true });

    const APP_ID = "2182360415187709";
    const options = {
      permissions: ["public_profile", "email", "user_birthday"]
    };
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      APP_ID,
      options
    );

    if (type === "success") {
      const fields = ["id", "first_name", "last_name", "gender", "birthday"];
      const response = await fetch(
        `https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`
      );

      const userData = await response.json();
      const { user: { uid } = {} } = await this._authenticate(token);

      this._createUser(uid, userData);
    }
  };

  _createUser = (uid, userData) => {
    firebase
      .database()
      .ref("users")
      .child(uid)
      .update({ ...userData, uid });
  };
}

export default Login;
