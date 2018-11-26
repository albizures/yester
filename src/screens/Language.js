import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Alert } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import SettingsItem from '../components/SettingsItem'
import withUser, { shapeContextUser } from '../components/withUser'
import { updateUserAttribute } from '../utils/session'

const isCheck = (locale, currentLocale) => {
  if (locale === currentLocale) {
    return SettingsItem.types.CHECK
  }
}

const LanguageItem = (props) => {
  const { currentLocale, locale, onPress } = props
  return (
    <SettingsItem
      {...props}
      type={isCheck(locale, currentLocale)}
      onPress={() => onPress(locale)} />
  )
}

LanguageItem.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

class Language extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  constructor (props) {
    super(props)
    const { locale } = props.contextUser.user
    this.state = {
      locale,
      isLoading: false,
    }
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  onPress = async (locale) => {
    const { navigation } = this.props
    this.setState({ isLoading: true })
    try {
      await updateUserAttribute('locale', locale)
      navigation.navigate('AppLoading', {
        lastScreen: 'Language',
      })
    } catch (error) {
      Alert.alert('Error updating the language')
      console.log(error, error.message)
      this.setState({ isLoading: false })
    }
  }

  render () {
    const { isLoading } = this.state
    const { locale: currentLocale } = this.props.contextUser.user
    const topBar = (
      <TopBar title='language.title' onBack={this.onBack} />
    )

    return (
      <Container topBar={topBar} isLoading={isLoading}>
        <View style={styles.container} >
          <LanguageItem
            title='English'
            currentLocale={currentLocale}
            locale='en'
            onPress={this.onPress} />
          <LanguageItem
            title='Español'
            currentLocale={currentLocale}
            locale='es'
            onPress={this.onPress} />
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

export default withUser(Language)
