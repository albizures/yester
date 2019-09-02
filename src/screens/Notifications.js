import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Alert } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import SettingsItem, { types } from '../components/SettingsItem'
import {
  getPermissionSubscriptionState,
  setSubscription,
  registerForPushNotifications,
} from '../utils/notifications'
import { translate } from '../components/Translate'
import { updateUserAttribute } from '../utils/session'
import withUser, { shapeContextUser } from '../components/withUser'
import { screen, track } from '../utils/analytics'
import debugFactory from 'debug'

const debugInfo = debugFactory('yester:Notifications:info')
// const debugError = debugFactory('yester:Notifications:error')

class Notificacions extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  state = {
    subscriptionEnabled: true,
  }

  componentDidMount () {
    screen('Notifications', {})
    getPermissionSubscriptionState((notifStatus) => {
      const { notifications } = this.props.contextUser.user
      this.setState({
        subscriptionEnabled: notifications,
      })

      debugInfo('DidMount notifications: ', notifications)
      debugInfo('DidMount notifStatus: ', notifStatus)
      if (notifications !== notifStatus.subscriptionEnabled) {
        setSubscription(notifications)
      }
    })
  }

  onPress = async () => {
    getPermissionSubscriptionState(async (notifStatus) => {
      debugInfo('OnPress Status: ', notifStatus)
      const { hasPrompted, notificationsEnabled } = notifStatus
      const { updateUser } = this.props.contextUser
      const { subscriptionEnabled } = this.state
      track('Notifications', { notifStatus: !subscriptionEnabled })

      if (!hasPrompted && !subscriptionEnabled) {
        registerForPushNotifications()
      }

      if (hasPrompted && !notificationsEnabled && !subscriptionEnabled) {
        Alert.alert(translate('settings.notifications.alert.manualAction'))
        return
      }

      this.setState({
        subscriptionEnabled: !subscriptionEnabled,
      })

      await updateUserAttribute('notifications', !subscriptionEnabled)
      updateUser()
      setSubscription(!subscriptionEnabled)
    })
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
            title={translate('settings.notifications.item.enabled')}
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

export default withUser(Notificacions)
