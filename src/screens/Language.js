import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import SettingsItem, { types } from '../components/SettingsItem'

export default class Language extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    const topBar = (
      <TopBar title='language.title' />
    )
    return (
      <Container topBar={topBar} >
        <View style={styles.container} >
          <SettingsItem title='English' type={types.CHECK}
            onPress={this.onPress} />
          <SettingsItem title='Spanish' onPress={this.onPress} />
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
