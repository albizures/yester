import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Text, Linking, Platform } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'
import icons from '../utils/icons'
import Container from '../components/Container'
import { Title, Description, Heading1, Heading5, Heading3, Heading4, Body1 } from '../components'
import Button, { types } from '../components/Button'
import Divider from '../components/Divider'
import { logOut } from '../utils/session'
import { getEntitlements, buySubscription } from '../utils/purchase'

class Subscription extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    entitlements: [],
  }

  async componentDidMount () {
    try {
      const entitlements = await getEntitlements()
      this.setState({
        entitlements,
      })
    } catch (e) {
      console.log('Error in  Subscription componentDidMount', e)
    }
  }

  onLogOut = async () => {
    const { navigation } = this.props
    await logOut()
    navigation.navigate('CreateAccount')
  }

  onStartTrial = async () => {
    const { navigation } = this.props
    await buySubscription(this.state.entitlements.pro.monthly.identifier)
    navigation.navigate('AppLoading')
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
    const terms = Platform.OS === 'ios' ? 'subscription.terms.ios' : 'subscription.terms.android'
    return (
      <View style={{ position: 'relative' }}>
        <Image source={icons.subscription} style={styles.image} />
        <Container scroll style={styles.container}>
          <View style={styles.topFlex}>
            <Title keyName='subscription.close' style={styles.closeText} onPress={this.onLogOut} />
            <Heading1 keyName='subscription.try' style={styles.tryText} />
            <Heading5 keyName='subscription.price' style={styles.priceText} />
            {
              // <Image source={icons.ballon} style={styles.ballonImage} />
            }
            <Heading3 keyName='subscription.slogan' style={styles.sloganText} />
            <Heading4 keyName='subscription.features' style={styles.featuresText} />

            <Button title='subscription.start' onPress={this.onStartTrial} type={types.OUTLINED} />
            <Body1 keyName='subscription.priceAfter' style={styles.priceAfterText} />
            <Body1
              keyName='subscription.restore'
              style={styles.restoreText}
              onPress={this.onStartTrial}
            />
          </View>

          <View style={styles.bottomFlex}>
            <Divider style={styles.divider} />

            <Description keyName='subscription.termsTitle' style={styles.termsTitleText} />
            <Text style={{ paddingBottom: 40 }}>
              <Description keyName={terms} style={styles.termsText} />
              <Description
                keyName='subscription.termsLink'
                style={styles.termsLink}
                onPress={this.onPressTerms}
              />
              <Description keyName='subscription.termsAnd' style={styles.termsText} />
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
    textAlign,
    marginBottom: height * 0.01,
  },
  priceText: {
    color,
    fontWeight: 'bold',
    textAlign,
    marginBottom: height * 0.07,
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
    marginBottom: height * 0.02,
  },
  featuresText: {
    color,
    textAlign,
    marginBottom: height * 0.05,
  },
  priceAfterText: {
    color,
    textAlign,
    marginTop: height * 0.01,
  },
  restoreText: {
    color,
    textAlign,
    textDecorationLine: 'underline',
    marginTop: height * 0.04,
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
