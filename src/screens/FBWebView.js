import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, WebView, Alert } from 'react-native'
import { FACEBOOK_URL_LOGIN } from 'react-native-dotenv'

import { loginWithFBWebView } from '../utils/session'

export default class FBWebView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onFBWebViewStateChange = async (event) => {
    const { navigation } = this.props
    console.log('onFBWebViewStateChange', event.url)
    if (event.url.includes('https://www.yester.app')) {
      if (event.url.includes('access_token=')) {
        try {
          await loginWithFBWebView(event.url)
          return navigation.navigate('AppLoading')
        } catch (error) {
          console.log('onFBWebViewStateChange', error)
          Alert.alert('Error', JSON.stringify(error))
          Alert.alert('Error', JSON.stringify(error.message))
        }
      }
    }

    navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          source={{uri: FACEBOOK_URL_LOGIN}}
          onNavigationStateChange={this.onFBWebViewStateChange} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
})
