import React, { Component } from "react";
import { Permissions, Location } from "expo";
import { View, ImageBackground } from "react-native";
import GeoFire from "geofire";
import * as firebase from "firebase";
import Card from "../../components/Card";
import SimpleScroller from "../../components/SimpleScroller";
import Profile from "../Profile";
import Matches from "../Matches";
import filter from "../../modules/filter";
import styles from "./styles";

class Home extends Component {
  state = {
    profileIndex: 0,
    profiles: [],
    user: this.props.navigation.state.params.user
  };

  render() {
    const { user } = this.state;

    return (
      <SimpleScroller
        screens={[
          <Profile user={user} />,
          this._renderCardStack(),
          <Matches user={user} navigation={this.props.navigation} />
        ]}
      />
    );
  }

  _renderCardStack = () => {
    const { profileIndex, profiles } = this.state;

    return (
      <ImageBackground
        source={require("../../../assets/no_image.png")}
        style={styles.container}
      >
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
      </ImageBackground>
    );
  };

  componentDidMount() {
    const { uid } = this.state.user;

    this._updateUserLocation(uid);

    firebase
      .database()
      .ref("users")
      .child(uid)
      .on("value", snap => {
        const user = snap.val();

        this.setState({
          user,
          profiles: [],
          profileIndex: 0
        });

        this._getProfiles(user.uid, user.distance);
      });
  }

  _getUser = uid => {
    return firebase
      .database()
      .ref("users")
      .child(uid)
      .once("value");
  };

  getSwiped = uid => {
    return firebase
      .database()
      .ref("relationships")
      .child(uid)
      .child("liked")
      .once("value")
      .then(snap => snap.val() || {});
  };

  _getProfiles = async (uid, distance) => {
    const geoFireRef = new GeoFire(firebase.database().ref("geoData"));
    const userLocation = await geoFireRef.get(uid);
    const swipedProfiles = await this.getSwiped(uid);
    const geoQuery = geoFireRef.query({
      center: userLocation,
      radius: distance // km
    });

    geoQuery.on("key_entered", async (uid, location, distance) => {
      const user = await this._getUser(uid);
      const profiles = [...this.state.profiles, user.val()];
      const filtered = filter(profiles, this.state.user, swipedProfiles);

      this.setState({ profiles: filtered });
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
    } else {
      console.log("Permission denied");
    }
  };

  _swipeCard = (swipedRight, profileUid) => {
    const userUid = this.state.user.uid;

    this.setState(state => ({ profileIndex: state.profileIndex + 1 }));

    if (swipedRight) {
      this._relate(userUid, profileUid, true);
    } else {
      this._relate(userUid, profileUid, false);
    }
  };

  _relate = (userUid, profileUid, status) => {
    let relationUpdate = {};

    relationUpdate[`${userUid}/liked/${profileUid}`] = status;
    relationUpdate[`${profileUid}/likedBack/${userUid}`] = status;

    firebase
      .database()
      .ref("relationships")
      .update(relationUpdate);
  };
}

export default Home;
