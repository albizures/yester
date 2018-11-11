import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'

export default class About extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render () {
    const topBar = (
      <TopBar title='about.title' onBack={this.onBack} />
    )
    return (
      <Container topBar={topBar} >
        <View />
      </Container>
    )
  }
}
