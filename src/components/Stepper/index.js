import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View } from 'react-native'

import Step from './Step'

export default class Stepper extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.func).isRequired,
  }

  flatList = React.createRef()

  state = {
    currentStep: 0,
    previousStep: null,
  }

  onSwipePageChange = ({ viewableItems }) => {
    if (!viewableItems[0] || this.state.currentStep === viewableItems[0].index) {
      return
    }

    this.setState(state => ({
      previousStep: state.currentStep,
      currentStep: viewableItems[0].index,
    }))
  }

  next = () => {
    const { current: flatList } = this.flatList
    const { currentStep } = this.state

    flatList.scrollToIndex({
      animated: true,
      index: currentStep + 1,
    })
  }

  skip = () => {
    const { current: flatList } = this.flatList
    const { children } = this.props

    flatList.scrollToIndex({
      animated: false,
      index: children.length - 1,
    })
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <Step index={index}>
      {item({
        ...this.state,
        index,
        skip: this.skip,
        next: this.next,
      })}
    </Step>
  )

  render () {
    const { children } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          ref={this.flatList}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onViewableItemsChanged={this.onSwipePageChange}
          data={children}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})
