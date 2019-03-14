import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, WebView, Alert } from 'react-native'
import { FACEBOOK_URL_LOGIN } from 'react-native-dotenv'
import withUser, { shapeContextUser } from '../components/withUser'
import { strings, translate } from '../components/Translate'
import { loginWithFBWebView, updateUserAttribute } from '../utils/session'

let attempts = 0

class FBWebView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }
  state = {
    logedIn: false,
  }

  onFBWebViewStateChange = async event => {
    const { updateUser } = this.props.contextUser
    const { navigation } = this.props
    const { logedIn } = this.state

    console.log('onFBWebViewStateChange: ', event.url)
    console.log('logedIn: ', logedIn)
    if (event.url.startsWith('https://www.yester.app')) {
      if (event.url.includes('access_token=')) {
        try {
          this.setState({
            logedIn: true,
          })
          await loginWithFBWebView(event.url)
          await updateUserAttribute('locale', strings.getLanguage())
          await updateUser()
          return navigation.navigate('AppLoading')
        } catch (error) {
          this.setState({
            logedIn: false,
          })
          console.log('onFBWebViewStateChange', error)
          navigation.goBack()
          Alert.alert(translate('login.error.facebook'))
        }
      } else if (!logedIn) {
        Alert.alert(translate('login.error.facebook'))
        navigation.navigate('CreateAccount')
      }
    } else if (
      event.url.startsWith(
        'https://m.facebook.com/v2.9/dialog/oauth?client_id='
      )
    ) {
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
    return (
      <View style={styles.container}>
        <WebView
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
