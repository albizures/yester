import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  PanResponder,
  Keyboard,
  UIManager,
  Dimensions,
  findNodeHandle,
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Description, Title } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import withUser, { shapeContextUser } from '../components/withUser'
import { translate } from '../components/Translate'
import colors from '../utils/colors'
import http from '../utils/http'
import { screen, track } from '../utils/analytics'
import debugFactory from 'debug'

const debugError = debugFactory('yester:Writing:error')
const debugInfo = debugFactory('yester:Writing:info')

class Writing extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  scroll = React.createRef()
  content = React.createRef()

  scrollPosition = 0
  state = {
    shift: 20,
    scrollOffset: 0,
    isLoading: false,
    title: this.props.navigation.getParam('question'),
    content: this.props.navigation.getParam('content', ''),
  }

  componentWillMount () {
    screen('Writing', {})
    if (Platform.OS === 'ios') {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: () => true,
      })
    }

    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.onKeyboardDidShow)
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.onKeyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowSub.remove()
    this.keyboardDidHideSub.remove()
  }

  componentDidMount () {
    this.content.current.focus()
  }

  onKeyboardDidShow = (event) => {
    if (!this.isFocused) {
      return
    }
    this.keyboardHeight = event.endCoordinates.height
    this.positionateScroll()
  }

  onKeyboardDidHide = () => {
    this.setState({ shift: 20, scrollOffset: 0 })
  }

  componentDidUpdate (prevProps, prevState) {
    setTimeout(() => {
      if (!this.scroll.current) return
      this.scroll.current.scrollTo({
        y: this.state.scrollOffset + this.scrollPosition,
        animated: true,
      })
    }, 50)
  }

  getNewScrollOffset (cursorPosition, viewport) {
    const [topViewport, bottomViewport] = viewport
    const isAboveViewport = cursorPosition < topViewport
    const isBelowViewport = cursorPosition > bottomViewport
    const isOutsideViewport = isAboveViewport || isBelowViewport

    if (!isOutsideViewport) {
      // it doesn't need any change
      return 0
    }

    if (isBelowViewport) {
      return cursorPosition - bottomViewport
    }
  }

  positionateScroll () {
    const headerOffset = 80
    const { keyboardHeight, selection } = this
    const { height: windowHeight } = Dimensions.get('window')
    const { content } = this.state

    if (!selection) {
      return
    }

    if (!keyboardHeight) {
      return
    }

    const percentagePosition = (100 * selection.start) / content.length / 100

    if (percentagePosition > 1) {
      return
    }

    UIManager.measure(
      findNodeHandle(this.content.current),
      (originX, originY, width, height, pageX, pageY) => {
        pageY = parseInt(pageY)
        const cursorPositionInTextInput = parseInt(height * percentagePosition)
        const cursorPosition = cursorPositionInTextInput + pageY - headerOffset
        const viewport = [headerOffset, windowHeight - keyboardHeight - 100]
        const scrollOffset = this.getNewScrollOffset(cursorPosition, viewport)

        this.setState({ shift: keyboardHeight + 20, scrollOffset })
        /*
        debugInfo(
          `
          selection: ${JSON.stringify(this.selection)},
          keyboardHeight: ${JSON.stringify(this.keyboardHeight)},
          scrollPosition: ${this.scrollPosition},
          content.lenght: ${content.length},
          percentagePosition: ${percentagePosition},
          isFocused: ${this.isFocused},

          height: ${height},
          pageY: ${pageY},
          cursorPositionInTextInput: ${cursorPositionInTextInput},
          cursorPosition: ${cursorPosition},
          viewport: ${viewport}
          scrollOffset: ${scrollOffset}`
        )
        */
      }
    )
  }

  onFocus = () => {
    this.isFocused = true
  }

  onBlur = () => {
    Keyboard.dismiss()
    this.isFocused = false
  }

  onSave = async () => {
    this.setState({ isLoading: true })
    const {
      navigation,
      contextUser: { updateStats },
    } = this.props
    const { title, content } = this.state
    const storyId = navigation.getParam('storyId')

    track('Save Story', { title })

    try {
      const { data } = await http.putAPI('/v2/stories/' + encodeURIComponent(storyId), {
        title: title,
        content: content,
      })
      await updateStats()
      // It's not necessary to update Authorization, because it's done
      // when navegate to My Story and then open Questions

      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'MainTab',
              action: NavigationActions.navigate({
                routeName: 'MyStory',
                action: NavigationActions.navigate({
                  routeName: 'Stories',
                  params: { storyId: data.id },
                }),
              }),
            }),
          ],
        })
      )
    } catch (error) {
      // TODO add a custom response for validation type eg."string.min", "StoryAlreadyExists"
      debugError(error)
      debugError(error.response)
      this.setState({ isLoading: false })
      Alert.alert(translate('writing.error.save'))
    }

    // this.setState({ isLoading: true })
  }

  onBack = () => {
    const { navigation } = this.props
    Alert.alert(translate('writing.unsaved.title'), translate('writing.unsaved.message'), [
      {
        text: 'Cancel',
        onPress: () => {
          this.content.current.focus()
        },
      },

      {
        text: 'Ok',
        onPress: () => {
          setTimeout(() => {
            navigation.navigate('MyStory')
          }, 150)
        },
      },
    ])
    Keyboard.dismiss()
  }

  onContentSizeChange = (event) => {
    if (!this.isFocused) {
      return
    }
    this.positionateScroll()
  }

  onChangeText = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  onSelectionChange = (event) => {
    const { selection } = event.nativeEvent
    this.selection = selection
    this.positionateScroll()
  }

  onScrollPositionMove = (event) => {
    this.scrollPosition = event.nativeEvent.contentOffset.y
  }

  render () {
    const { name } = this.props.contextUser.user
    const { content, title, isLoading, shift } = this.state

    const action = (
      <Title
        keyName='writing.action'
        style={{ textDecorationLine: 'underline', color: colors.white }}
        onPress={this.onSave}
      />
    )
    const topBar = <TopBar title='writing.topbar' onBack={this.onBack} action={action} />

    const scrollEvents = {
      onScroll: this.onScrollPositionMove,
      onMomentumScrollEnd: this.onScrollPositionMove,
    }

    return (
      <Container
        scroll
        scrollEvents={scrollEvents}
        scrollRef={this.scroll}
        keyboardDismissMode='none'
        isLoading={isLoading}
        topBar={topBar}
      >
        <View
          style={{ paddingHorizontal: 29, paddingTop: 20, marginBottom: shift }}
          {...(Platform.OS === 'ios' ? this.panResponder.panHandlers : {})}
        >
          <TextInput
            multiline
            value={title}
            onChangeText={(value) => this.onChangeText('title', value)}
            style={styles.title}
            placeholder='Name your story...'
          />
          <Description keyName='writing.by' data={{ author: name }} />
          <TextInput
            ref={this.content}
            value={content}
            placeholder='Your story...'
            maxLength={2048}
            multiline
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSelectionChange={this.onSelectionChange}
            onContentSizeChange={this.onContentSizeChange}
            onChangeText={(value) => this.onChangeText('content', value)}
            style={styles.textArea}
          />
        </View>
      </Container>
    )
  }
}

export default withUser(Writing)

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'transparent',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Karla-Regular',
    color: colors.mineShaft,
    textAlign: 'left',
  },
  textArea: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    paddingTop: 10,
    textAlignVertical: 'top',
    textAlign: 'justify',
    backgroundColor: 'transparent',
    marginTop: 30,
  },
})
