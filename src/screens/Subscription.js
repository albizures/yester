import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'
import Container from '../components/Container'
import { Heading1, Title, Description, Heading5 } from '../components'
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
      <Container style={[styles.container]} >

        <View style={styles.container2}>

          <Heading1 keyName='common.upperTitle' style={[styles.font, {marginTop: 79}]} />

          <Text style={[styles.font, {marginTop: 33}]}>
            <Title keyName='subscription.weKnow' style={[styles.font]} />
            <Title keyName='subscription.weWant' style={[styles.font, {fontWeight: 'bold'}]} />
          </Text>

          <Title keyName='subscription.receive' style={[styles.font, styles.margin]} />

          <Button onPress={this.onPressSubscription}
            title='subscription.start'
            type={types.OUTLINED} />

          <Description keyName='subscription.price'
            style={[styles.font, styles.margin, {textAlign: 'center'}]} />

          <Divider style={[styles.margin]} />

          <Description keyName='subscription.cancel' style={{fontWeight: 'bold', color: colors.athensGray, marginBottom: height * 0.01}} />
          <Description keyName='subscription.recurring' style={{color: colors.athensGray}} />

          <View style={styles.container3}>
            <Text style={{textAlign: 'center'}}>
              <Heading5 keyName='subscription.already' style={styles.font} />
              <Heading5 keyName='subscription.restore' style={[styles.font, {fontWeight: 'bold', textDecorationLine: 'underline'}]} />
            </Text>
          </View>
        </View>
      </Container>
    )
  }
}

let { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    backgroundColor: colors.haiti,
  },
  container2: {
    paddingHorizontal: width * 0.08,
  },
  container3: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    marginTop: height - 51 - 20,
    height: 51,
    width: width,
    backgroundColor: colors.governorBay,
    opacity: 0.79,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginVertical: height * 0.03,
  },
  font: {
    color: colors.white,
    textAlign: 'center',
  },
})

export default Suscription
