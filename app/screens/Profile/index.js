import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text } from "react-native";
import CircleImage from "../../components/CircleImage";
import styles from "./styles";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const { first_name, work, id } = this.props.user;
    const bio =
      work && work[0] && work[0].position ? work[0].position.name : null;

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <CircleImage id={id} size={120} />
          <Text style={styles.firstName}>{first_name}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      </View>
    );
  }
}

export default Profile;
