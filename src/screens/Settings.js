import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Linking, Platform } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import { logOut, isAuthorized, subscriptionStatus } from '../utils/session'
import SettingsItem, { types } from '../components/SettingsItem'
import { translate } from '../components/Translate'
import { resetAnalytics, screen, track } from '../utils/analytics'
import withUser, { shapeContextUser } from '../components/withUser'

class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  willFocusListener = null

  componentDidMount () {
    const { addListener } = this.props.navigation
    this.willFocusListener = addListener('willFocus', this.load)
  }

  componentWillUnmount () {
    this.willFocusListener.remove()
  }

  load = () => {
    screen('Settings', {})
  }

  onPressLanguage = () => {
    this.props.navigation.navigate('Language')
  }

  onPressNotifications = () => {
    this.props.navigation.navigate('Notifications')
  }

  onPressTerms = () => {
    track('Terms', {})
    Linking.openURL('https://www.yester.app/terms')
  }

  onPressAbout = () => {
    track('About', {})
    Linking.openURL('https://www.yester.app')
  }

  onPressManage = async () => {
    const { navigation } = this.props
    const currentStatus = await isAuthorized(this.props)
    track('Manage Subscription', { subscriptionStatus: currentStatus.tag })

    if (currentStatus !== subscriptionStatus.PRO) {
      return navigation.navigate('Subscription', { currentStatus })
    }
    Platform.OS === 'ios'
      ? Linking.openURL('https://apps.apple.com/account/subscriptions')
      : Linking.openURL('https://play.google.com/store/account/subscriptions')
  }

  onLogOut = async () => {
    const { navigation } = this.props
    await logOut()
    track('Log Out', {})
    resetAnalytics()
    navigation.navigate('Auth')
  }

  onPressFacebook = async () => {}

  render () {
    const topBar = <TopBar title='settings.title' />
    return (
      <Container topBar={topBar}>
        <View style={styles.container}>
          {/*
          <SettingsItem title={translate('settings.item.facebook')} type={types.TEXT}
            onPress={this.onPressFacebook} />
            */}
          <SettingsItem
            title={translate('settings.item.language')}
            type={types.CHEVRON}
            onPress={this.onPressLanguage}
          />
          {
            <SettingsItem
              title={translate('settings.item.notifications')}
              type={types.CHEVRON}
              onPress={this.onPressNotifications}
            />
          }
          <SettingsItem
            title={translate('settings.item.terms')}
            type={types.CHEVRON}
            onPress={this.onPressTerms}
          />
          <SettingsItem
            title={translate('settings.item.about')}
            type={types.CHEVRON}
            onPress={this.onPressAbout}
          />
          <SettingsItem
            title={translate('settings.item.subscription')}
            type={types.CHEVRON}
            onPress={this.onPressManage}
          />
          <SettingsItem title={translate('settings.item.logOut')} onPress={this.onLogOut} />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
})

export default withUser(Settings)
