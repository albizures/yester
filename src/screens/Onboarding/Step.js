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
    description2: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    children: PropTypes.node,
  }
  render () {
    const { cover, title, title2, description, description2, style, children } = this.props
    return (
      <Fragment>
        <View style={{flex: 1, backgroundColor: colors.haiti, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image source={cover} style={{position: 'absolute', width: 375, height: 667}} />
          <View style={{height: 525, alignItems: 'center', justifyContent: 'flex-start'}} >
            <View style={{height: 120, alignItems: 'center', justifyContent: 'flex-end'}} >
              <Heading2 keyName={title} style={{textAlign: 'center', color: colors.white, fontWeight: 'normal', marginHorizontal: 115}} />
            </View>
            <Heading1 keyName={title2} style={[{textAlign: 'center', color: colors.brightTurquoise, lineHeight: 48}, style]} />
          </View>
          <Heading4 keyName={description} style={{textAlign: 'center', color: colors.white, marginHorizontal: 55}} />
          <Heading4 keyName={description2} style={{textAlign: 'center', color: colors.brightTurquoise, marginHorizontal: 55}} />
        </View>
        {children}
      </Fragment>
    )
  }
}
