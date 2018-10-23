import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Heading1, Heading2, Heading4 } from '../../components'
import colors from '../../utils/colors'

export default class Step extends Component {
  static propTypes = {
    cover: Image.propTypes.source.isRequired,
    title: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node,
  }
  render () {
    const { cover, title, title2, description, children } = this.props
    return (
      <Fragment>
        <View style={{flex: 1, backgroundColor: colors.haiti, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image source={cover} style={{width: 20, height: 20}} />
          <View style={{marginVertical: 40, alignItems: 'center'}} >
            <Heading2 keyName={title} style={{textAlign: 'center', color: colors.white, fontWeight: 'normal', marginHorizontal: 115}} />
            <Heading1 keyName={title2} style={{textAlign: 'center', color: colors.brightTurquoise, marginHorizontal: 75}} />
          </View>
          <Heading4 keyName={description} style={{textAlign: 'center', color: colors.white, marginHorizontal: 75, marginTop: 120}} />
        </View>
        {children}
      </Fragment>
    )
  }
}
