import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { pickBy, intersection, keys, find } from "lodash";
import CircleImage from "../../components/CircleImage";
import styles from "./styles";

class Matches extends Component {
  static propTypes = {
    user: PropTypes.object,
    navigation: PropTypes.object
  };

  state = {
    matches: []
  };

  render() {
    return (
      <FlatList
        data={this.state.matches}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSeparator}
        style={styles.container}
      />
    );
  }

  _renderItem = ({ item }) => {
    const { id, first_name, work } = item;
    const bio =
      work && work[0] && work[0].position ? work[0].position.name : null;

    return (
      <TouchableOpacity
        onPress={this._onMatchItemPress}
        activeOpacity={0.8}
        hitSlop={{ left: 20, right: 20 }}
      >
        <View style={styles.row}>
          <CircleImage size={80} id={id} />

          <View style={styles.info}>
            <Text style={styles.name}>{first_name}</Text>

            <Text style={styles.bio}>{bio}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this._getMatches(this.props.user.uid);
  }

  _onMatchItemPress = () => this.props.navigation.navigate("Chat");

  _renderSeparator = () => <View style={styles.separator} />;

  _keyExtractor = item => item.id;

  _getOverlap = (liked, likedBack) => {
    const likedTrue = pickBy(liked, value => value);
    const likedBackTrue = pickBy(likedBack, value => value);

    return intersection(keys(likedTrue), keys(likedBackTrue));
  };

  _getUser = uid =>
    firebase
      .database()
      .ref("users")
      .child(uid)
      .once("value")
      .then(snap => snap.val());

  _getMatches = uid => {
    firebase
      .database()
      .ref("relationships")
      .child(uid)
      .on("value", snap => {
        const relations = snap.val();
        const allMatches = this._getOverlap(
          relations.liked,
          relations.likedBack
        );

        const promises = allMatches.map(profileUid => {
          const foundProfile = find(
            this.state.matches,
            profile => profile.uid === profileUid
          );

          return foundProfile || this._getUser(profileUid);
        });

        Promise.all(promises).then(data => this.setState({ matches: data }));
      });
  };
}

export default Matches;
