import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Alert } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'
import icons from '../utils/icons'
import Container from '../components/Container'
import { Title, Description, Heading1, Heading3 } from '../components'
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
      return Alert.alert("We couldn't process your payment")
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

  render () {
    return (
      <View style={{ position: 'relative' }}>
        <Image source={icons.subscription} style={styles.image} />
        <Container scroll style={styles.container}>
          <View style={styles.topFlex}>
            <Heading3
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
          </View>

          <View style={styles.bottomFlex}>
            <Divider style={styles.divider} />

            <Description
              keyName='subscription.termsTitle'
              style={styles.termsTitleText}
            />
            <Description
              keyName='subscription.terms'
              style={styles.termsText}
            />
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
    paddingBottom: height * 0.06,
  },
  bottomFlex: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.08,
  },
  bottomRibbon: {
    flex: 1,
    position: 'absolute',
    top: height - 51,
    zIndex: 2,
    height: 51,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.governorBay,
    opacity: 0.79,
  },
  image: {
    position: 'absolute',
    zIndex: 0,
    width,
    height,
  },
  ballonImage: {
    width: 78,
    height: 98.88,
    marginBottom: height * 0.06,
  },
  closeText: {
    color,
    alignSelf: 'flex-end',
    marginBottom: height * 0.03,
  },
  tryText: {
    color,
    marginBottom: height * 0.045,
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
  priceText: {
    color,
    textAlign,
    marginBottom: height * 0.06,
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
  divider: {
    width: 300,
    alignSelf: 'center',
    backgroundColor: colors.royalBlue,
    marginBottom: 15,
  },
})

export default Subscription
