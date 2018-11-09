import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList, Alert, Image, Modal, Dimensions } from 'react-native'
import QuestionItem from './QuestionItem'
import StoryItem from './StoryItem'
import QuestionCard from './QuestionCard'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import { Title } from '../../components'
import http from '../../utils/http'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { indexToString, capitalize } from '../../utils'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
    modalVisible: false,
    item: {},
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

  renderChapter = ({item}) => (
    <View style={styles.chapterView}>
      <View style={styles.chapterTitle}>
        <Image source={icons.childhood} style={styles.chapterImage} />
        <Title text={capitalize(item.text)} style={styles.chapterText} />
      </View>
      <FlatList
        data={this.state.questions}
        renderItem={this.renderStoryItem}
        keyExtractor={indexToString}
      />
    </View>
  )

  renderStoryItem = ({item}) => (
    <StoryItem data={item} onPress={() => this.onPressItem(item)} />
  )

  onPressItem = (item) => {
    this.setModalVisible(true, item)
  }

  setModalVisible (visible, item) {
    this.setState({modalVisible: visible, item: item})
  }

  onPressWrite = () => {
    this.setModalVisible(!this.state.modalVisible)
    this.props.navigation.navigate('Writing')
  }

  onPressSkip = () => {
    this.setModalVisible(!this.state.modalVisible)
  }

  render () {
    const { isLoading, item, ages, modalVisible } = this.state
    const topBarTitle = (
      <View style={styles.topBarView}>
        <Image source={icons.logoWhite} style={styles.topBarLogo} />
      </View>
    )
    const data = {text: 'Question of the day', category: 'Category', age: 'Chapter', story: 'This is where my story begins....'}
    const topBar = (
      <TopBar title={topBarTitle} />
    )
    return (
      <Container topBar={topBar} isLoading={isLoading} style={styles.container} >
        <Modal
          animationType='fade'
          transparent
          visible={modalVisible} >
          <View style={styles.modalView}>
            <QuestionCard
              data={item}
              onPressWrite={this.onPressWrite}
              onPressSkip={this.onPressSkip} />
          </View>
        </Modal>
        <View style={styles.view}>
          <QuestionItem data={data} onPress={() => this.onPressItem(data)} />
          <FlatList
            data={ages}
            renderItem={this.renderChapter}
            keyExtractor={indexToString}
            horizontal
          />
        </View>
      </Container>
    )
  }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.athensGray,
  },
  topBarLogo: {
    width: 100,
    height: 26,
  },
  topBarView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 12,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.athensGray,
    paddingTop: 20,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(98, 97, 232, 0.85)',
  },
  chapterView: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chapterTitle: {
    width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    marginTop: 33,
    marginBottom: 20,
  },
  chapterImage: {
    width: 28,
    height: 30,
    marginRight: 10,
  },
  chapterText: {
    color: colors.governorBay,
    fontWeight: 'bold',
    paddingTop: 5,
  },
})
