import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button, StyleSheet, FlatList, Alert, Image } from 'react-native'
import QuestionItem from './QuestionItem'

import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import Translate from '../../components/Translate'
import http from '../../utils/http'
import common from '../../styles/common'
import colors from '../../utils/colors'
import { indexToString } from '../../utils'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
    ages: [],
    topics: [],
  }

  async componentDidMount () {
    this.setState({
      isLoading: true,
    })
    try {
      const { data } = await http.get('https://my-json-server.typicode.com/gluix20/treasure/db')
      this.setState({
        isLoading: false,
        ...data,
      })
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  onPress = () => {
    this.props.navigation.navigate('Question')
  }

  renderAgeItem = ({item}) => (
    <View>
      <Text style={[common.h3, localStyles.sectionHeader]}>
        {item.text}
      </Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        {this.getTopicsItems()}
      </View>
    </View>
  )

  renderTopicItem = ({item}) => (
    <QuestionItem text={item.text} />
  )

  getAgesItems = () => (
    <FlatList
      data={this.state.ages}
      renderItem={this.renderAgeItem}
      keyExtractor={indexToString}
    />
  )

  getTopicsItems = () => (
    <FlatList
      data={this.state.questions}
      renderItem={this.renderTopicItem}
      keyExtractor={indexToString}
    />
  )

  render () {
    const { isLoading } = this.state
    const topBarTitle = (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Image style={{ height: 25, width: 20 }} source={require('../../assets/feather-white.png')} />
        <Translate keyName='home.title' style={{color: colors.white}} />
      </View>
    )

    const topBar = (
      <TopBar title={topBarTitle} />
    )
    return (
      <Container topBar={topBar} isLoading={isLoading} >
        <Text style={[{textAlign: 'center', marginTop: 40}]}>HOME</Text>
        <Button title='to Question' onPress={this.onPress} />
        { this.getAgesItems() }
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
  },
})
