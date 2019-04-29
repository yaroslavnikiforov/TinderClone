import React, { Component } from "react";
import { Permissions, Location } from "expo";
import { View, StyleSheet } from "react-native";
import GeoFire from "geofire";
import * as firebase from "firebase";
import Card from "../../components/Card";
import SimpleScroller from "../../components/SimpleScroller";
import Profile from "../Profile";
import styles from "./styles";

class Home extends Component {
  state = {
    profileIndex: 0,
    profiles: [],
    user: this.props.navigation.state.params.user
  };

  render() {
    return (
      <SimpleScroller
        screens={[<Profile user={this.state.user} />, this._renderCardStack()]}
      />
    );
  }

  _renderCardStack = () => {
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
  };

  componentDidMount() {
    const { uid } = this.props.navigation.state.params.user;

    this._updateUserLocation(uid);
    this._getProfiles(uid);
  }

  _getUser = uid => {
    return firebase
      .database()
      .ref("users")
      .child(uid)
      .once("value");
  };

  _getProfiles = async uid => {
    const geoFireRef = new GeoFire(firebase.database().ref("geoData"));
    const userLocation = await geoFireRef.get(uid);
    const geoQuery = geoFireRef.query({
      center: userLocation,
      radius: 10 // km
    });

    geoQuery.on("key_entered", async (uid, location, distance) => {
      console.log(
        uid + " at " + location + " is " + distance + " km from the center"
      );

      const user = await this._getUser(uid);

      console.log(user.val().first_name);

      const profiles = [...this.state.profiles, user.val()];

      this.setState({ profiles });
    });
  };

  _updateUserLocation = async uid => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: false
      });
      //const { latitude, longitude } = location.coords;
      const latitude = 37.39239;
      const longitude = -122.09072;
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
