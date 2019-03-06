import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import { logOut } from '../utils/session'
import SettingsItem, { types } from '../components/SettingsItem'

export default class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressLanguage = () => {
    this.props.navigation.navigate('Language')
  }

  onPressNotifications = () => {
    this.props.navigation.navigate('Notifications')
  }

  onPressTerms = () => {
    this.props.navigation.navigate('Terms')
  }

  onPressAbout = () => {
    this.props.navigation.navigate('About')
  }

  onLogOut = async () => {
    const { navigation } = this.props
    await logOut()
    navigation.navigate('Auth')
  }

  onPressFacebook = async () => {}

  render () {
    const topBar = <TopBar title='settings.title' />
    return (
      <Container topBar={topBar}>
        <View style={styles.container}>
          {/*
          <SettingsItem title='Facebook' type={types.TEXT}
            onPress={this.onPressFacebook} />
            */}
          <SettingsItem
            title='Language'
            type={types.CHEVRON}
            onPress={this.onPressLanguage}
          />
          {/*
          <SettingsItem title='Notifications' type={types.CHEVRON}
            onPress={this.onPressNotifications} />
            */}
          <SettingsItem
            title='Terms and Conditions'
            type={types.CHEVRON}
            onPress={this.onPressTerms}
          />
          <SettingsItem
            title='About Yester'
            type={types.CHEVRON}
            onPress={this.onPressAbout}
          />
          <SettingsItem title='Log Out' onPress={this.onLogOut} />
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
