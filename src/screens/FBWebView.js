import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, WebView, Alert } from 'react-native'
import { FACEBOOK_URL_LOGIN } from 'react-native-dotenv'
import withUser, { shapeContextUser } from '../components/withUser'
import { strings } from '../components/Translate'
import { loginWithFBWebView, updateUserAttribute } from '../utils/session'

class FBWebView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  onFBWebViewStateChange = async (event) => {
    const { updateUser } = this.props.contextUser
    const { navigation } = this.props
    console.log('onFBWebViewStateChange', event.url)
    if (event.url.startsWith('https://www.yester.app')) {
      if (event.url.includes('access_token=')) {
        try {
          await loginWithFBWebView(event.url)
          await updateUserAttribute('locale', strings.getLanguage())
          await updateUser()
          return navigation.navigate('AppLoading')
        } catch (error) {
          console.log('onFBWebViewStateChange', error)
          navigation.goBack()
          Alert.alert('Error', JSON.stringify(error.message))
        }
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          source={{ uri: FACEBOOK_URL_LOGIN }}
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

export default withUser(FBWebView)
