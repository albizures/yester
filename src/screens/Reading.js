import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  Share,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
} from 'react-native'
import { Heading1, Description, Heading2 } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'
import IconButton from '../components/IconButton'
import colors from '../utils/colors'
import icons from '../utils/icons'
import http from '../utils/http'
import { authorizeAction } from '../utils/session'
import moment from 'moment'
import { translate } from '../components/Translate'
import { screen, track } from '../utils/analytics'
import debugFactory from 'debug'

const debugError = debugFactory('yester:Reading:error')
// const debugInfo = debugFactory('yester:Reading:info')

class Reading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
    contextAges: PropTypes.shape(shapeContextAges).isRequired,
  }

  state = {
    isLoading: false,
    title: '',
    content: '',
    created: '',
  }

  async componentDidMount () {
    const { navigation } = this.props
    const storyId = navigation.getParam('storyId')
    screen('Reading', {})

    this.setState({ isLoading: true })

    try {
      const {
        data: { content, question_id: questionId, age_id: ageId, title, created },
      } = await http.getAPI('/v2/stories/' + encodeURIComponent(storyId))
      this.setState({
        storyId,
        content,
        questionId,
        ageId,
        title,
        created: moment(created).format('LL'),
      })
    } catch (error) {
      Alert.alert(translate('reading.error'))
      navigation.goBack()
      debugError(error)
      debugError(error.message)
      debugError(error.response)
    }

    this.setState({ isLoading: false })
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  onShare = () => {
    const { title, content } = this.state
    const message = `${title}: ${content}`.substr(0, 250)
    Share.share({
      title: 'test lwlw',
      message: `${message}...`,
    })
  }

  getTitleComponent () {
    const { title } = this.state
    if (title.length > 65) {
      return Heading2
    }

    return (props) => <Heading1 {...props} style={[props.style, { fontSize: 40 }]} />
  }

  onEdit = async () => {
    const { navigation } = this.props
    await authorizeAction(this.props, (currentStatus) => {
      if (currentStatus.authorized) {
        const { title: question, content, ageId, storyId } = this.state
        const params = { ageId, question, storyId, content }
        track('Edit Story', { title: question })
        return navigation.replace('Writing', params)
      }
    })
  }

  render () {
    const { isLoading, title, content, ageId, created } = this.state
    const { name: author } = this.props.contextUser.user
    const { ages } = this.props.contextAges
    const age = (ages[ageId] || {}).name || ''
    const statusBarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'

    // const action = (
    //   <Title
    //     keyName='reading.share'
    //     style={{ textDecorationLine: 'underline', color: colors.governorBay }}
    //     onPress={this.onShare} />
    // )

    const topBar = (
      <TopBar
        transparent
        // action={action}
        onBack={this.onBack}
      />
    )

    const TitleComponent = this.getTitleComponent()

    return (
      <Container scroll isLoading={isLoading} topBar={topBar}>
        <View style={styles.container}>
          <StatusBar barStyle={statusBarStyle} />
          <View style={styles.topRow}>
            <View style={styles.topLeftRow}>
              <Image source={icons.flatFeather} style={styles.feather} />
              <Description text={age.toUpperCase()} />
            </View>
            <TouchableOpacity onPress={this.onEdit}>
              <View style={styles.topRightRow}>
                <Description style={styles.edit} keyName='reading.edit.story' />
                <IconButton>
                  <Image source={icons.pencil} style={styles.icon} />
                </IconButton>
              </View>
            </TouchableOpacity>
          </View>
          <TitleComponent text={title} style={{ color: colors.governorBay, marginTop: 40 }} />
          {/* TODO: make smaller this font */}
          <Description keyName='reading.by' data={{ author }} />
          {/* TODO: make smaller this font and changes its color to gray */}
          <Description text={created} />
          <Text multiline style={styles.content}>
            {content}
          </Text>
        </View>
      </Container>
    )
  }
}

export default withAges(withUser(Reading))

const styles = StyleSheet.create({
  topRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  edit: {
    marginRight: 10,
    color: colors.governorBay,
    fontWeight: 'bold',
  },
  topLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  feather: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  container: {
    paddingHorizontal: 29,
  },
  content: {
    marginVertical: 40,
    fontFamily: 'Karla-Regular',
    fontSize: 18,
    textAlignVertical: 'top',
    textAlign: 'justify',
    backgroundColor: 'transparent',
  },
  nameText: {
    marginTop: 10,
  },
})
