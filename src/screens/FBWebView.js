import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Alert, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import { FACEBOOK_URL_LOGIN } from 'react-native-dotenv'
import withUser, { shapeContextUser } from '../components/withUser'
import { strings, translate } from '../components/Translate'
import { loginWithFBWebView, updateUserAttribute, logOut } from '../utils/session'
import { Title } from '../components'
import colors from '../utils/colors'
import debugFactory from 'debug'

const debugError = debugFactory('yester:FBWebView:error')
const debugInfo = debugFactory('yester:FBWebView:info')

let attempts = 0
let loggedIn = false
let alreadyEntry = false
let processingCode = false

class FBWebView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  componentDidMount () {
    loggedIn = false
    this.setState({
      key: 1,
    })
  }

  state = {
    key: 1,
  }

  onFBWebViewStateChange = async (event) => {
    const { updateUser } = this.props.contextUser
    const { navigation } = this.props

    debugInfo('onFBWebViewStateChange: ', event.url)
    debugInfo('loggedIn: ', loggedIn)
    if (event.url.startsWith('https://www.yester.app')) {
      if (event.url.includes('code=')) {
        try {
          if (loggedIn) {
            return
          }
          loggedIn = true
          await loginWithFBWebView(event.url)
          await updateUserAttribute('locale', strings.getLanguage())
          await updateUser()

          return navigation.navigate('AppLoading')
        } catch (error) {
          debugError('onFBWebViewStateChange', error)

          if (error.error === 'invalid_grant') {
            return
          }

          loggedIn = false
          Alert.alert(translate('login.error.facebook'))
          return navigation.goBack()
        }
      } else if (event.url.includes('error_description=Already+found+an+entry+for')) {
        debugError('Already entry')
        alreadyEntry = true
        attempts = 0
        this.setState({
          key: this.state.key + 1,
        })
      } else if (event.url.includes('error_description=Exception+processing+authorization+code')) {
        debugError('Exception processing authorization code')
        processingCode = true
        attempts = 0
        this.setState({
          key: this.state.key + 1,
        })
      } else if (!loggedIn && !alreadyEntry && !processingCode) {
        Alert.alert(translate('login.error.facebook'))
        navigation.navigate('CreateAccount')
      }
    } else if (event.url.startsWith('https://m.facebook.com/v2.9/dialog/oauth')) {
      attempts = attempts + 1
      debugInfo('attempts:', attempts)
      if (attempts === 2) {
        attempts = 0
        Alert.alert(translate('login.error.facebook'))
        navigation.goBack()
      }
    }
  }

  onLogOut = async () => {
    const { navigation } = this.props
    try {
      await logOut()
    } catch (error) {
      debugError(error)
    }
    navigation.navigate('CreateAccount')
  }

  render () {
    // debugInfo('FB_URL_Login:', FACEBOOK_URL_LOGIN)
    return (
      <View style={styles.container}>
        <Title keyName='subscription.close' style={styles.closeText} onPress={this.onLogOut} />
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

const color = colors.black
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    width: '100%',
  },
  closeText: {
    color,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    marginRight: width * 0.08,
  },
})

export default withUser(FBWebView)
