import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import * as firebase from 'firebase'

import Card from './Card'

const firebaseConfig = {
  apiKey: 'AIzaSyCgo549LMZCLmLWSjdoEZk-W9CEQSLkI4Y',
  databaseURL: 'https://tinderclone-5b194.firebaseio.com',
}

firebase.initializeApp(firebaseConfig)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

class App extends Component {
  state = {
    profileIndex: 0,
    profiles: [],
  }

  componentWillMount() {
    firebase
      .database()
      .ref()
      .child('users')
      .once('value', snap => {
        let profiles = []

        snap.forEach(profile => {
          const { id, name, bio, birthday } = profile.val()

          profiles.push({ id, name, bio, birthday })
        })

        this.setState({ profiles })
      })
  }

  render() {
    const { profileIndex, profiles } = this.state

    return (
      <View style={styles.container}>
        {profiles
          .slice(profileIndex, profileIndex + 3)
          .reverse()
          .map(profile => (
            <Card
              key={profile.id}
              profile={profile}
              onSwipeOff={this._onSwipeOff}
            />
          ))}
      </View>
    )
  }

  _onSwipeOff = () =>
    this.setState(prevState => ({ profileIndex: prevState.profileIndex + 1 }))
}

export default App
