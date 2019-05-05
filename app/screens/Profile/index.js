import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Switch } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import CircleImage from "../../components/CircleImage";
import styles from "./styles";

const MIN_AGE = 18;
const MAX_AGE = 40;
const MIN_DISTANCE = 1;
const MAX_DISTANCE = 25;
const DEFAULT_DISTANCE = 10;

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  state = {
    ageRange: [MIN_AGE, MAX_AGE],
    distance: [DEFAULT_DISTANCE],
    showMen: false,
    showWomen: true
  };

  render() {
    const { ageRange, distance, showMen, showWomen } = this.state;
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

        <View style={styles.sliderWrapper}>
          <View style={styles.labelWrapper}>
            <Text>Distance</Text>

            <Text style={styles.rangeLabel}>{distance} km</Text>
          </View>

          <MultiSlider
            values={distance}
            min={MIN_DISTANCE}
            max={MAX_DISTANCE}
            onValuesChange={this._onDistanceChange}
          />

          <View style={styles.labelWrapper}>
            <Text>Age range</Text>

            <Text style={styles.rangeLabel}>{ageRange.join("-")}</Text>
          </View>

          <MultiSlider
            values={ageRange}
            min={MIN_AGE}
            max={MAX_AGE}
            onValuesChange={this._onAgeRangeChange}
          />

          <View style={styles.switchWrapper}>
            <Text>Show women</Text>

            <Switch value={showWomen} onValueChange={this._switchShowWomen} />
          </View>

          <View style={styles.switchWrapper}>
            <Text>Show men</Text>

            <Switch value={showMen} onValueChange={this._switchShowMen} />
          </View>
        </View>
      </View>
    );
  }

  _onAgeRangeChange = ageRange => this.setState({ ageRange });

  _onDistanceChange = distance => this.setState({ distance });

  _switchShowMen = value => this.setState({ showMen: value });

  _switchShowWomen = value => this.setState({ showWomen: value });
}

export default Profile;
