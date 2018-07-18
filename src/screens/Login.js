import React, { Component } from 'react'
import { Text, View, WebView } from 'react-native'

export default class Login extends Component {
  render () {
    return (
      <WebView
        source={{uri: 'https://tatalapp.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=2u2fhefrj53r2fhrs967422d3l&redirect_uri=https://twitter.com'}}
        style={{marginTop: 20}}
      />
    )
  }
}