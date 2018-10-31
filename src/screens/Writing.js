import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { Description, Title } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import { getUser } from '../utils/session'
import colors from '../utils/colors'
import http from '../utils/http'

export default class Writing extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    title: '',
    content: '',
    // change these state to props
    questionId: 'Question#0004',
    ageId: 'Age#01',
    firstName: '',
    lastName: '',
  }

  onPress = () => {
    this.props.navigation.navigate('Reading')
  }

  async componentDidMount () {
    const user = await getUser()

    this.setState({
      firstName: user.attributes.given_name,
      lastName: user.attributes.family_name,
    })
  }

  onSave = async () => {
    const { navigation } = this.props
    const { questionId, ageId, title, content } = this.state
    console.log({
      'age_id': ageId,
      'question_id': questionId,
      'title': title,
      'content': content,
    })
    try {
      const { status, data } = await http.post('/v1/stories', {
        'age_id': ageId,
        'question_id': questionId,
        'title': title,
        'content': content,
      })

      if (status === 201) {
        return navigation.navigate('Reading', {
          storyId: data.id,
        })
      }
    } catch (error) {
      // TODO add a custom response for validation type eg."string.min", ""StoryAlreadyExists""
      console.log(error)
      console.log(error.response)
    }

    Alert.alert('Something bad happpend, try again')
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
    const { firstName, lastName, content, title } = this.state
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
            {/* <Button title='to Reading' onPress={this.onPress} /> */}
            <TextInput value={title} onChangeText={value => this.onChange('title', value)} style={styles.title} placeholder='Name your story...' />
            <Description keyName='writing.by' data={{autor: `${firstName} ${lastName}`}} />
            <TextInput
              value={content}
              placeholder='Your story...'
              maxLength={1000}
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
