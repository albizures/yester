import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import Container from '../../components/Container'
import { Heading2, Heading4, Body2 } from '../../components'
import Button from '../../components/Button'
import { saveUserData } from '../../utils/session'
import colors from '../../utils/colors'
import { extractSetupParams } from '../../utils'
import icons from '../../utils/icons'
import withUser, { shapeContextUser } from '../../components/withUser'

class Confirmation extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  constructor (props) {
    super(props)
    const { navigation } = this.props
    this.state = extractSetupParams(navigation)
  }

  onContinue = async () => {
    const {
      navigation,
      contextUser: { updateUser },
    } = this.props
    const { birthDate, country, state, gender, birthPlace } = this.state
    await saveUserData({ birthDate, country, state, gender, birthPlace })
    await updateUser()
    navigation.navigate('Home')
  }

  onEdit = () => {
    const { navigation } = this.props
    const {
      birthDate,
      country,
      state,
      countryName,
      stateName,
      name,
      gender,
      birthPlace,
    } = this.state
    navigation.navigate('SetupBirthDate', {
      birthDate,
      country,
      state,
      countryName,
      stateName,
      name,
      gender,
      birthPlace,
    })
  }

  render () {
    const { name, stateName } = this.state
    return (
      <Container style={styles.container}>
        <Image source={icons.confirmation} style={styles.image} />

        <View style={styles.topFlex}>
          <Heading2
            keyName='setup.confirmation.title'
            data={{ state: stateName, name }}
            style={styles.titleText}
          />

          <Heading4 keyName='setup.confirmation.subtitle' style={styles.subtitleText} />
        </View>

        <View style={styles.bottomFlex}>
          <Body2 keyName='setup.confirmation.edit' style={styles.editText} onPress={this.onEdit} />

          <Button
            title='setup.confirmation.continue'
            onPress={this.onContinue}
            type={Button.OUTLINED}
          />
        </View>
      </Container>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: height * 0.08,
    backgroundColor: colors.haiti,
  },
  topFlex: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: height * 0.23,
  },
  bottomFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    width,
    height,
  },
  titleText: {
    color: colors.white,
    textAlign: 'center',
  },
  subtitleText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 12,
  },
  editText: {
    color: colors.white,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: height * 0.06,
  },
})

export default withUser(Confirmation)
