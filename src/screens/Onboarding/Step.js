import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet } from 'react-native'
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
        <View style={styles.container}>
          <Image source={cover} style={styles.image} />
          <View style={styles.titleView} >
            <View style={styles.subtitleView} >
              <Heading2 keyName={title} style={styles.subtitle} />
            </View>
            <Heading1 keyName={title2} style={[styles.title, style]} />
          </View>
          <Heading4 keyName={description} style={{textAlign: 'center', color: colors.white, marginHorizontal: 50}} />
          <Heading4 keyName={description2} style={{textAlign: 'center', color: colors.brightTurquoise, marginHorizontal: 50}} />
        </View>
        {children}
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.haiti,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  titleView: {
    height: '79%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subtitleView: {
    height: '24%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'normal',
    marginHorizontal: '30%',
  },
  title: {
    textAlign: 'center',
    color: colors.brightTurquoise,
    lineHeight: 48,
  },
})
