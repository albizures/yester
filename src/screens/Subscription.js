import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'
import icons from '../utils/icons'
import Container from '../components/Container'
import { Title, Description, Heading5 } from '../components'
import Button, {types} from '../components/Button'
import Divider from '../components/Divider'

class Suscription extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressSubscription = () => {
    this.props.navigation.navigate('CreateAccount')
  }

  onPressLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render () {
    return (
      <View style={{position: 'relative'}}>

        <Image source={icons.subscription} style={styles.image} />
        <View style={styles.bottomRibbon}>
          <Text style={{textAlign: 'center'}}>
            <Heading5 keyName='subscription.already' style={styles.alreadyText} />
            <Heading5 keyName='subscription.restore' style={styles.restoreText} onPress={this.onPressLogin} />
          </Text>
        </View>
        <Container scroll style={styles.container} >

          <View style={styles.topFlex}>
            <Image source={icons.logoWhite} style={styles.logo} />
            <Text style={styles.paragraph1}>
              <Title keyName='subscription.weKnow' style={styles.weKnowText} />
              <Title keyName='subscription.weWant' style={styles.weWantText} />
            </Text>
            <Title keyName='subscription.receive' style={styles.receiveText} />
            <Description keyName='subscription.then' style={styles.thenText} />

            <Button title='subscription.start' onPress={this.onPressSubscription} type={types.OUTLINED} />
            <Description keyName='subscription.price' style={styles.priceText} />
          </View>

          <View style={styles.bottomFlex}>

            <Divider style={styles.divider} />

            <Description keyName='subscription.cancel' style={styles.cancelText} />
            <Description keyName='subscription.recurring' style={styles.recurringText} />

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
    paddingTop: height * 0.12,
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
  logo: {
    width: 151,
    height: 39,
    marginBottom: height * 0.045,
  },
  paragraph1: {
    marginBottom: height * 0.03,
  },
  weKnowText: {
    color,
    textAlign,
  },
  weWantText: {
    color,
    textAlign,
    fontWeight: 'bold',
  },
  receiveText: {
    color,
    textAlign,
    marginBottom: height * 0.02,
  },
  thenText: {
    color,
    textAlign,
    marginBottom: height * 0.06,
  },
  priceText: {
    color,
    textAlign,
    marginTop: height * 0.01,
  },
  cancelText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.athensGray,
    marginBottom: height * 0.01,
  },
  recurringText: {
    color: colors.athensGray,
  },
  alreadyText: {
    color,
    textAlign,
  },
  restoreText: {
    color,
    textAlign,
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

export default Suscription
