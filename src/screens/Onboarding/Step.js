import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Heading2, Heading4 } from '../../components'

export default class Step extends Component {
  static propTypes = {
    cover: Image.propTypes.source.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node,
  }
  render () {
    const { cover, title, description, children } = this.props
    return (
      <Fragment>
        <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image source={cover} style={{marginBottom: 20}} />
          <Heading2 keyName={title} style={{marginHorizontal: 75, marginVertical: 20}} />
          <Heading4 keyName={description} style={{marginHorizontal: 75}} />
        </View>
        {children}
      </Fragment>
    )
  }
}
