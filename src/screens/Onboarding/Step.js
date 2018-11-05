import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import { Heading1, Heading2, Heading4 } from '../../components'
import colors from '../../utils/colors'

export default class Step extends Component {
  static propTypes = {
    cover: Image.propTypes.source.isRequired,
    title: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    description2: PropTypes.string.isRequired,
    children: PropTypes.node,
  }
  render () {
    const { cover, title, title2, description, description2, children } = this.props
    return (
      <Fragment>
        <View style={styles.container}>
          <Image source={cover} style={styles.image} />

          <View style={styles.topFlex} >
            <View style={styles.subtitleView} >
              <Heading2 keyName={title} style={styles.subtitleText} />
            </View>
            <Heading1 keyName={title2} style={styles.titleText} />
          </View>

          <View style={styles.bottomFlex} >
            <Heading4 keyName={description} style={styles.descriptionText} />
            <Heading4 keyName={description2} style={styles.description2Text} />
          </View>

        </View>
        {children}
      </Fragment>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.haiti,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    position: 'absolute',
    width,
    height,
  },
  topFlex: {
    flex: 7.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomFlex: {
    flex: 2.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subtitleView: {
    height: height * 0.195,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  subtitleText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'normal',
  },
  titleText: {
    textAlign: 'center',
    color: colors.brightTurquoise,
    lineHeight: 48,
  },
  descriptionText: {
    textAlign: 'center',
    color: colors.white,
  },
  description2Text: {
    textAlign: 'center',
    color: colors.brightTurquoise,
  },
})
