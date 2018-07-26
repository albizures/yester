import React, { Component } from 'react'
import {
  Text, View, FlatList, ActivityIndicator, StyleSheet,
} from 'react-native'
// import PropTypes from 'prop-types'
// import Translate from '../components/Translate'
// import styles from '../styles/common'

class Topics extends Component {
  constructor (props) {
    super(props)
    this.state = { isLoading: true }
  }

  componentDidMount () {
    return fetch('https://my-json-server.typicode.com/gluix20/treasure/db')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={localStyles.container}>
        <FlatList
          data={this.state.dataSource.ages}

          renderItem={({item}) =>
            <View>
              <Text style={localStyles.sectionHeader}>{item.text}</Text>
              <FlatList
                data={this.state.dataSource.topics}
                renderItem={({item}) => <Text style={localStyles.item}>
                  {item.text}</Text>}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default Topics
