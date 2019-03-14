import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Alert,
  Text,
  Linking,
} from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'
import icons from '../utils/icons'
import Container from '../components/Container'
import { Title, Description, Heading1, Heading5 } from '../components'
import Button, { types } from '../components/Button'
import Divider from '../components/Divider'
import {
  saveUserSubscriptionStatus,
  removeSuscription,
  logOut,
} from '../utils/session'
import {
  getEntitlements,
  buySubscription,
  status,
  setPurchaseListener,
} from '../utils/purchase'

class Subscription extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  componentWillUnmount () {
    if (this.removeListener) {
      this.removeListener(this.handlePurchaserInfo)
    }
  }

  onLogOut = async () => {
    const { navigation } = this.props
    await logOut()
    navigation.navigate('CreateAccount')
  }

  onStartTrial = async () => {
    const { monthly } = await getEntitlements()
    this.removeListener = setPurchaseListener(this.handlePurchaserInfo)
    buySubscription(monthly.identifier)
  }

  handlePurchaserInfo = async (error, purchaserInfo = {}, type) => {
    const { navigation } = this.props

    if (this.removeListener) {
      this.removeListener()
    }

    if (error) {
      console.log('error', error)
      const message =
        error.code === 2
          ? 'Process has been cancelled'
          : "We couldn't process your payment"
      return Alert.alert(message)
    }

    const { activeSubscriptions = [] } = purchaserInfo

    if (purchaserInfo.activeEntitlements.length === 0) {
      try {
        await removeSuscription()
      } catch (error) {
        console.error('handlePurchaserInfo', error)
      }
      return Alert.alert("We couldn't process your payment")
    }

    if (activeSubscriptions.length === 0) {
      return Alert.alert("We couldn't process your payment")
    }

    try {
      await saveUserSubscriptionStatus(status.SUBSCRIBED)
      navigation.navigate('AppLoading')
    } catch (error) {
      Alert.alert("We couldn't update your suscription, please contact us")
    }
  }

  onRestore = async () => {}

  onPressTerms = () => {
    // this.props.navigation.navigate('Terms')
    Linking.openURL('https://www.yester.app/terms')
  }

  onPressPrivacy = () => {
    // this.props.navigation.navigate('About')
    Linking.openURL('https://www.yester.app/privacy')
  }

  render () {
    return (
      <View style={{ position: 'relative' }}>
        <Image source={icons.subscription} style={styles.image} />
        <Container scroll style={styles.container}>
          <View style={styles.topFlex}>
            <Title
              keyName='subscription.close'
              style={styles.closeText}
              onPress={this.onLogOut}
            />
            <Heading1 keyName='subscription.try' style={styles.tryText} />
            <Description
              keyName='subscription.price'
              style={styles.priceText}
            />
            <Image source={icons.ballon} style={styles.ballonImage} />
            <Title keyName='subscription.slogan' style={styles.sloganText} />
            <Title
              keyName='subscription.features'
              style={styles.featuresText}
            />

            <Button
              title='subscription.start'
              onPress={this.onStartTrial}
              type={types.OUTLINED}
            />
            <Heading5
              keyName='subscription.restore'
              style={styles.restoreText}
              onPress={this.onStartTrial}
            />
          </View>

          <View style={styles.bottomFlex}>
            <Divider style={styles.divider} />

            <Description
              keyName='subscription.termsTitle'
              style={styles.termsTitleText}
            />
            <Text style={{ paddingBottom: 40 }}>
              <Description
                keyName='subscription.terms'
                style={styles.termsText}
              />
              <Description
                keyName='subscription.termsLink'
                style={styles.termsLink}
                onPress={this.onPressTerms}
              />
              <Description
                keyName='subscription.termsAnd'
                style={styles.termsText}
              />
              <Description
                keyName='subscription.privacyLink'
                style={styles.termsLink}
                onPress={this.onPressPrivacy}
              />
            </Text>
          </View>
        </Container>
      </View>
    )
  }
}

const color = colors.white
const textAlign = 'center'
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  topFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.07,
    paddingHorizontal: width * 0.08,
    paddingBottom: height * 0.04,
  },
  bottomFlex: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.08,
  },
  image: {
    position: 'absolute',
    zIndex: 0,
    width,
    height,
  },
  closeText: {
    color,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  tryText: {
    color,
    marginBottom: height * 0.01,
  },
  priceText: {
    color,
    textAlign,
    marginBottom: height * 0.03,
  },
  ballonImage: {
    width: 78,
    height: 98.88,
    marginBottom: height * 0.04,
  },
  sloganText: {
    color,
    textAlign,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  featuresText: {
    color,
    textAlign,
    marginBottom: height * 0.05,
  },
  restoreText: {
    color,
    textAlign,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: height * 0.03,
  },
  termsTitleText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.athensGray,
    marginBottom: height * 0.01,
  },
  termsText: {
    color: colors.athensGray,
  },
  termsLink: {
    color,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  divider: {
    width: 300,
    alignSelf: 'center',
    backgroundColor: colors.royalBlue,
    marginBottom: 15,
  },
})

export default Subscription
