import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

import Translate from '../../components/Translate'

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
        <Image source={cover} />
        <Translate keyName={title} />
        <Translate keyName={description} />
        {children}
      </Fragment>
    )
  }
}
