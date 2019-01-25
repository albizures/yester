import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'

import { Description, Title } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import withUser, { shapeContextUser } from '../components/withUser'

import colors from '../utils/colors'
import http from '../utils/http'

class Writing extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  state = {
    title: this.props.navigation.getParam('question'),
    content: this.props.navigation.getParam('content', ''),
  }

  onSave = async () => {
    const { navigation } = this.props
    const { title, content } = this.state
    const storyId = navigation.getParam('storyId')

    try {
      const { data } = await http.put('/v1/stories/' + encodeURIComponent(storyId), {
        'title': title,
        'content': content,
      })

      navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'MainTab',
            action: NavigationActions.navigate({
              routeName: 'MyStory',
              action: NavigationActions.navigate({
                routeName: 'Home',
                params: {storyId: data.id},
              }),
            }),
          }),
        ],
      }))
    } catch (error) {
      // TODO add a custom response for validation type eg."string.min", "StoryAlreadyExists"
      console.log(error)
      console.log(error.response)
      Alert.alert('Something bad happpend, try again')
    }
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.navigate('Home')
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render () {
    const { name } = this.props.contextUser.user
    const { content, title } = this.state

    const action = (
      <Title
        keyName='writing.action'
        style={{ textDecorationLine: 'underline', color: colors.white }}
        onPress={this.onSave} />
    )
    const topBar = (
      <TopBar
        title='writing.topbar'
        onBack={this.onBack}
        action={action} />
    )
    return (
      <Container scroll topBar={topBar}>
        <KeyboardAvoidingView enabled behavior='position'>
          <View style={{paddingHorizontal: 29, paddingTop: 20}}>
            <TextInput
              multiline
              value={title}
              onChangeText={value => this.onChange('title', value)}
              style={styles.title}
              placeholder='Name your story...'
            />
            <Description keyName='writing.by' data={{author: name}} />
            <TextInput
              value={content}
              placeholder='Your story...'
              maxLength={1024}
              multiline
              onChangeText={value => this.onChange('content', value)}
              style={styles.textArea}
            />
          </View>
        </KeyboardAvoidingView>
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
    height: 400,
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    paddingTop: 10,
    textAlignVertical: 'top',
    textAlign: 'justify',
    backgroundColor: 'transparent',
    marginTop: 30,
  },
})
