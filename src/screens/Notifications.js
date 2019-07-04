import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import SettingsItem, { types } from '../components/SettingsItem'
import {
  getPermissionSubscriptionState,
  setSubscription,
  requestPermissions,
} from '../utils/notifications'
import debugFactory from 'debug'

const debugInfo = debugFactory('yester:Notifications:info')
const debugError = debugFactory('yester:Notifications:error')

export default class Notificacions extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    subscriptionEnabled: true,
  }

  componentDidMount () {
    getPermissionSubscriptionState(this.setStatus)
  }

  setStatus = (status) => {
    debugInfo(status)
    const { subscriptionEnabled } = status
    this.setState({
      subscriptionEnabled,
    })
  }

  onPress = () => {
    const { subscriptionEnabled } = this.state
    requestPermissions()
    setSubscription(!subscriptionEnabled)
    getPermissionSubscriptionState(this.setStatus)
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render () {
    const { subscriptionEnabled } = this.state
    const topBar = <TopBar title='notifications.title' onBack={this.onBack} />
    return (
      <Container topBar={topBar}>
        <View style={styles.container}>
          <SettingsItem
            title='Push notifications'
            type={types.TOGGLE}
            onPress={this.onPress}
            valueToggle={subscriptionEnabled}
          />
          {
            // Disabled until email notification feature will be released.
            // <SettingsItem title='Email' type={types.TOGGLE} onPress={this.onPress} />
          }
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 20,
  },
})
