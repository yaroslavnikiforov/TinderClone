import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";

class Chat extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  state = {
    messages: [],
    user: this.props.navigation.state.params.user,
    profile: this.props.navigation.state.params.profile
  };

  render() {
    const { messages, user } = this.state;

    return (
      <GiftedChat
        messages={messages}
        user={{ _id: user.uid }}
        onSend={this._onSendMessage}
      />
    );
  }

  componentDidMount() {
    const { user, profile } = this.state;

    this.chatId =
      user.uid > profile.uid
        ? `${user.uid}-${profile.uid}`
        : `${profile.uid}-${user.uid}`;
  }

  _onSendMessage = message =>
    firebase
      .database()
      .ref("messages")
      .child(this.chatId)
      .push({ ...message[0], createdAt: Date.now() });
}

export default Chat;
