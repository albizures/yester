import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'
import QuestionCard from './Home/QuestionCard'

export default class Question extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Writing')
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>QUESTION</Text>
        <Button title='to Writing' onPress={this.onPress} />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <QuestionCard text={'Question Card'} />
        </View>
      </View>
    )
  }
}
