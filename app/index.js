import React, { Component } from 'react'
import * as firebase from 'firebase'

import Home from './screens/Home'

const firebaseConfig = {
  apiKey: 'AIzaSyCgo549LMZCLmLWSjdoEZk-W9CEQSLkI4Y',
  databaseURL: 'https://tinderclone-5b194.firebaseio.com',
}

firebase.initializeApp(firebaseConfig)

export default class App extends Component {
  render() {
    return <Home />
  }
}
