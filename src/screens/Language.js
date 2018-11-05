import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Alert } from 'react-native'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import SettingsItem from '../components/SettingsItem'
import withUser from '../components/withUser'
import { updateUserAttribute } from '../utils/session'
import { strings } from '../components/Translate'

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
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    const { user: { locale } } = props
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
    const { updateUser } = this.props
    this.setState({ isLoading: true })
    try {
      await updateUserAttribute('locale', locale)
      strings.setLanguage(locale)
      await updateUser()
    } catch (error) {
      Alert.alert('Error updating the language')
      console.log(error, error.message)
    }

    this.setState({ isLoading: false })
  }

  render () {
    const { isLoading } = this.state
    const { user: { locale: currentLocale } } = this.props
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
