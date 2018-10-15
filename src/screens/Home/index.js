import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, FlatList, Alert, Image, Modal } from 'react-native'
import QuestionItem from './QuestionItem'
import QuestionCard from './QuestionCard'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import Translate from '../../components/Translate'
import http from '../../utils/http'
import colors from '../../utils/colors'
import { indexToString } from '../../utils'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
    modalVisible: false,
    item: {},
  }

  setModalVisible (visible, item) {
    this.setState({modalVisible: visible, item: item})
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

  renderAgeItem = ({item}) => (
    <View>
      <Text style={[localStyles.ageText]}>
        {item.text}
      </Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        {this.getTopicsItems()}
      </View>
    </View>
  )

  renderTopicItem = ({item}) => (
    <QuestionItem
      questionText={item.text}
      topicText={'Your Name (Topic)'}
      onPress={() => this.onPressItem(item)}
    />
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

  onPressItem = (item) => {
    this.setModalVisible(true, item)
  }

  onPressWrite = () => {
    this.setModalVisible(!this.state.modalVisible)
    this.props.navigation.navigate('Writing')
  }

  onPressSkip = () => {
    this.setModalVisible(!this.state.modalVisible)
  }

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
      <Container topBar={topBar} isLoading={isLoading} style={{backgroundColor: colors.athensGray}} >
        <Modal
          animationType='fade'
          transparent
          visible={this.state.modalVisible} >
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <QuestionCard
              item={this.state.item}
              onPressWrite={this.onPressWrite}
              onPressSkip={this.onPressSkip} />
          </View>
        </Modal>
        <Text style={[{textAlign: 'center', marginTop: 20}]}>HOME</Text>
        { this.getAgesItems() }
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  ageText: {
    fontFamily: 'Karla-Regular',
    color: colors.governorBay,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
  },
})
