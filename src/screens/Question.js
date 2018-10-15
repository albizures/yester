import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import QuestionCard from './Home/QuestionCard'

export default class Question extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressWrite = () => {
    this.props.navigation.navigate('Writing')
  }

  onPressSkip = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>QUESTION</Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <QuestionCard
            text={'Question Card'}
            onPressWrite={this.onPressWrite}
            onPressSkip={this.onPressSkip} />
        </View>
      </View>
    )
  }
}
