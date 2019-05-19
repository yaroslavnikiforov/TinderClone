import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import firebase from "firebase";
import { forEach } from "lodash";
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
    const avatar = `https://graph.facebook.com/${user.id}/picture?height=80`;

    return (
      <GiftedChat
        messages={messages}
        user={{ _id: user.uid, avatar }}
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

    this._watchChat();
  }

  _onSendMessage = message =>
    firebase
      .database()
      .ref("messages")
      .child(this.chatId)
      .push({ ...message[0], createdAt: Date.now() });

  _watchChat = () =>
    firebase
      .database()
      .ref("messages")
      .child(this.chatId)
      .on("value", snap => {
        let messages = [];

        forEach(snap.val(), message => messages.push(message));
        messages.reverse();

        this.setState({ messages });
      });
}

export default Chat;
