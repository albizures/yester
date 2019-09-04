import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Heading2, Description, Heading5 } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import Divider from '../components/Divider'
import colors from '../utils/colors'
import icons from '../utils/icons'
import withUser, { shapeContextUser } from '../components/withUser'
import { isSetupFinished } from '../utils/session'
import { screen } from '../utils/analytics'
// import debugFactory from 'debug'
// const debugInfo = debugFactory('yester:Profile:info')
// const debugError = debugFactory('yester:Profile:error')

class Profile extends Component {
  static propTypes = {
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
    navigation: PropTypes.object.isRequired,
  }

  state = {
    conditionalText: {
      [true]: {
        subscriptionStatus: 'profile.subscriptionStatus.active',
      },
      [false]: {
        subscriptionStatus: 'profile.subscriptionStatus.inactive',
      },
    },
  }

  constructor (props) {
    super(props)
    const { conditionalText } = this.state
    const {
      contextUser: { user },
    } = props
    this.state = { conditionalText, user, isLoading: true }
  }

  willFocusListener = null

  async componentDidMount () {
    const { navigation } = this.props
    const { addListener } = navigation
    this.willFocusListener = addListener('willFocus', this.load)
  }

  componentWillUnmount () {
    this.willFocusListener.remove()
  }

  load = async () => {
    this.setState({
      isLoading: true,
    })
    screen('Profile', {})

    const {
      contextUser: { stats },
    } = this.props
    const { questionCounter, storyCounter } = stats
    this.setState({
      isLoading: false,
      questionCounter,
      storyCounter,
    })
  }

  onPressEdit = async () => {
    const { navigation } = this.props
    const { user } = this.state
    const { params } = await isSetupFinished(user)
    return navigation.navigate('SetupBirthDate', params)
  }

  onPressVerify = async () => {
    const { navigation } = this.props
    const { email, emailVerified } = this.state.user
    if (!emailVerified) {
      return navigation.navigate('ConfirmAccount', { email: email, signUpVerify: false })
    }
  }

  render () {
    const { isLoading, questionCounter, storyCounter, user, conditionalText } = this.state
    const completed = storyCounter ? Math.round((storyCounter / questionCounter) * 100) : '...'
    const {
      name,
      email,
      country,
      state,
      gender,
      birthPlace,
      emailVerified,
      purchaserInfo: { authorized },
    } = user

    const text = conditionalText[authorized]

    const location =
      birthPlace !== undefined ? birthPlace : `${country}, ${state ? state.substring(3, 5) : ''}`

    const topBar = <TopBar title='profile.title' />

    let verificationElement = (
      <Description
        keyName='profile.verifiedEmail.confirmed'
        style={{ color: 'green', marginTop: height * 0.01 }}
      />
    )
    if (!emailVerified) {
      verificationElement = (
        <View style={styles.verification}>
          <Description keyName='profile.verifiedEmail.unconfirmed' style={{ color: 'red' }} />
          <Heading5
            keyName='profile.verifiedEmail.confirm'
            style={styles.confirmText}
            onPress={this.onPressVerify}
          />
        </View>
      )
    }

    return (
      <Container scroll topBar={topBar} isLoading={isLoading} style={styles.container}>
        <View style={styles.topFlex}>
          <Image
            source={gender === 'male' ? icons.profileMan : icons.profileWoman}
            style={styles.image}
          />
          <Heading2 text={name} style={styles.nameText} />
          <Heading5
            keyName='profile.stories.answered'
            data={{ answered: storyCounter || '...', completed }}
            style={{ marginBottom: 30, textAlign: 'center' }}
          />
        </View>

        <View style={styles.bottomFlex}>
          <Divider style={{ width: 323 }} />
          <View style={styles.item}>
            <Description keyName='profile.subscriptionStatus' />
            <Heading5 keyName={text.subscriptionStatus} style={{ fontWeight: 'bold' }} />
          </View>
          <Divider style={{ width: 323 }} />
          <View style={styles.item}>
            <Description keyName='profile.email' />
            <Heading5 text={email} style={{ fontWeight: 'bold' }} onPress={this.onPressVerify} />
            {verificationElement}
          </View>
          <Divider style={{ width: 323 }} />
          <View style={styles.item}>
            <Description keyName='profile.location' />
            <Heading5 text={location} style={{ fontWeight: 'bold' }} />
          </View>
          <Divider style={{ width: 323 }} />
          <TouchableOpacity style={styles.edit}>
            <Description
              keyName='profile.edit'
              style={styles.editLabel}
              onPress={this.onPressEdit}
            />
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  topFlex: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.06,
  },
  bottomFlex: {
    flex: 0.65,
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
  },
  nameText: {
    marginTop: 17,
    color: colors.governorBay,
  },
  image: {
    width: 100,
    height: 100,
  },
  item: {
    width: 300,
    minHeight: height * 0.1,
    alignItems: 'flex-start',
    paddingVertical: height * 0.025,
  },
  verification: {
    flexDirection: 'row',
    width: 300,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: height * 0.015,
  },
  confirmText: {
    fontWeight: 'bold',
    color: colors.governorBay,
  },
  edit: {
    width: 300,
    height: 80,
    alignItems: 'center',
    paddingTop: 40,
  },
  editLabel: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
})

export default withUser(Profile)
