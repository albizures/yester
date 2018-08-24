import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button, StyleSheet, FlatList, Alert } from 'react-native'
import QuestionItem from './QuestionItem'

import Container from '../../components/Container'
import http from '../../utils/http'
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
    this.props.navigation.navigate('Home2')
  }

  renderAgeItem = ({item}) => (
    <View>
      <Text style={localStyles.sectionHeader}>{item.text}</Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        {this.getTopicsItems()}
      </View>
    </View>
  )

  renderTopicItem = ({item}) => (
    <QuestionItem item={item} />
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
      data={this.state.topics}
      renderItem={this.renderTopicItem}
      keyExtractor={indexToString}
    />
  )

  render () {
    const { isLoading } = this.state
    return (
      <Container isLoading={isLoading} >
        <Text style={[{textAlign: 'center', marginTop: 40}]}>HOME</Text>
        <Button title='to Home-2' onPress={this.onPress} />
        { this.getAgesItems() }
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: colors.mischka,
  },
})
