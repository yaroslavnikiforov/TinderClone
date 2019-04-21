import React, { Component } from "react";

import { Permissions, Location } from "expo";
import { View, StyleSheet } from "react-native";
import GeoFire from "geofire";
import * as firebase from "firebase";

import Card from "../../components/Card";

import styles from "./styles";

class Home extends Component {
  state = {
    profileIndex: 0,
    profiles: []
  };

  render() {
    const { profileIndex, profiles } = this.state;

    return (
      <View style={styles.container}>
        {profiles
          .slice(profileIndex, profileIndex + 3)
          .reverse()
          .map(profile => (
            <Card
              key={profile.id}
              profile={profile}
              onSwipeOff={this._swipeCard}
            />
          ))}
      </View>
    );
  }

  componentDidMount() {
    this._updateUserLocation(this.props.navigation.state.params.uid);

    firebase
      .database()
      .ref()
      .child("users")
      .once("value", snap => {
        let profiles = [];

        snap.forEach(profile => {
          const { id, name, bio, birthday } = profile.val();

          profiles.push({ id, name, bio, birthday });
        });

        this.setState({ profiles });
      });
  }

  _updateUserLocation = async uid => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: false
      });
      const { latitude, longitude } = location.coords;
      const geoFireRef = new GeoFire(firebase.database().ref("geoData"));

      geoFireRef.set(uid, [latitude, longitude]);

      console.log("Permission granted");
      console.info("location: ", location);
    } else {
      console.log("Permission denied");
    }
  };

  _swipeCard = () =>
    this.setState(state => ({ profileIndex: state.profileIndex + 1 }));
}

export default Home;
