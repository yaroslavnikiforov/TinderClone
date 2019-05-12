import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, Text, Animated, PanResponder } from "react-native";
import moment from "moment";
import styles from "./styles";

class Card extends Component {
  static propTypes = {
    profile: PropTypes.object,
    onSwipeOff: PropTypes.func
  };

  constructor(props) {
    super(props);

    const { onSwipeOff, profile } = props;

    this.pan = new Animated.ValueXY();
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y }
      ]),
      onPanResponderRelease: (e, { dx }) => {
        const absDx = Math.abs(dx);
        const direction = absDx / dx;
        const swipedRight = direction > 0;

        if (absDx > 120) {
          Animated.decay(this.pan, {
            velocity: { x: 3 * direction, y: 0 },
            deceleration: 0.995
          }).start(() => onSwipeOff(swipedRight, profile.uid));
        } else {
          Animated.spring(this.pan, {
            toValue: { x: 0, y: 0 },
            friction: 4.5
          }).start();
        }
      }
    });
  }

  render() {
    const { birthday, first_name, work, id } = this.props.profile;
    const bio =
      work && work[0] && work[0].position ? work[0].position.name : null;
    const age = moment().diff(moment(birthday, "MM/DD/YYYY"), "years");
    const fbImage = `https://graph.facebook.com/${id}/picture?height=500`;

    const rotateCard = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["10deg", "0deg", "-10deg"]
    });
    const animatedStyles = {
      transform: [
        { translateX: this.pan.x },
        { translateY: this.pan.y },
        { rotate: rotateCard }
      ]
    };

    return (
      <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[styles.container, animatedStyles]}
      >
        <Image style={styles.image} source={{ uri: fbImage }} />

        <View style={styles.info}>
          <Text style={styles.name}>
            {first_name}, {age}
          </Text>

          {bio && <Text style={styles.bio}>{bio}</Text>}
        </View>
      </Animated.View>
    );
  }
}

export default Card;
