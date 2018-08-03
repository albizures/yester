import React, { Component } from 'react'
import { WebView } from 'react-native'

const uri = 'https://tatalapp.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=2u2fhefrj53r2fhrs967422d3l&redirect_uri=https://twitter.com'

export default class Facebook extends Component {
  render () {
    return (
      <WebView source={{ uri }} style={{marginTop: 20}} />
    )
  }
}
