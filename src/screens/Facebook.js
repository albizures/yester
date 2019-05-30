import React, { Component } from 'react'
import { WebView } from 'react-native'

const uri = 'https://tatalapp.auth.us-east-2.amazoncognito.com/oauth2/authorize?response_type=token&client_id=2u2fhefrj53r2fhrs967422d3l&redirect_uri=https://www.yester.app&identity_provider=Facebook'

export default class Facebook extends Component {
  render () {
    return (
      <WebView source={{ uri }} style={{ marginTop: 20 }} />
    )
  }
}
