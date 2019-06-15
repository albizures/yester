import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Alert } from 'react-native'
import { WebView } from 'react-native-webview'
import { FACEBOOK_URL_LOGIN } from 'react-native-dotenv'
import withUser, { shapeContextUser } from '../components/withUser'
import { strings, translate } from '../components/Translate'
import { loginWithFBWebView, updateUserAttribute } from '../utils/session'
import debugFactory from 'debug'

const debugError = debugFactory('yester:FBWebView:error')
const debugInfo = debugFactory('yester:FBWebView:info')

let attempts = 0
let logedIn = false
let alreadyEntry = false

class FBWebView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  state = {
    key: 1,
  }

  onFBWebViewStateChange = async (event) => {
    const { updateUser } = this.props.contextUser
    const { navigation } = this.props

    debugInfo('onFBWebViewStateChange: ', event.url)
    debugInfo('logedIn: ', logedIn)
    if (event.url.startsWith('https://www.yester.app')) {
      if (event.url.includes('code=')) {
        try {
          logedIn = true
          await loginWithFBWebView(event.url)
          await updateUserAttribute('locale', strings.getLanguage())
          await updateUser()
          return navigation.navigate('AppLoading')
        } catch (error) {
          logedIn = false
          debugError('onFBWebViewStateChange', error)
          navigation.goBack()
          Alert.alert(translate('login.error.facebook'))
        }
      } else if (event.url.includes('error_description=Already+found+an+entry+for')) {
        debugError('Already entry')
        alreadyEntry = true
        attempts = 0
        this.setState({
          key: this.state.key + 1,
        })
      } else if (!logedIn && !alreadyEntry) {
        Alert.alert(translate('login.error.facebook'))
        navigation.navigate('CreateAccount')
      }
    } else if (event.url.startsWith('https://m.facebook.com/v2.9/dialog/oauth')) {
      attempts = attempts + 1
      console.log('attempts:', attempts)
      if (attempts === 2) {
        attempts = 0
        Alert.alert(translate('login.error.facebook'))
        navigation.goBack()
      }
    }
  }

  render () {
    debugInfo('FB_URL_Login:', FACEBOOK_URL_LOGIN)
    return (
      <View style={styles.container}>
        <WebView
          key={this.state.key}
          style={styles.webview}
          source={{ uri: FACEBOOK_URL_LOGIN }}
          onNavigationStateChange={this.onFBWebViewStateChange}
        />
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
