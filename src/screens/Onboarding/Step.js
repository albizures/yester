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
    children: PropTypes.node,
  }
  render () {
    const { cover, title, title2, description, description2, children } = this.props
    return (
      <Fragment>
        <View style={styles.container}>
          <Image source={cover} style={styles.image} />
          <View style={styles.titleView} >
            <View style={styles.subtitleView} >
              <Heading2 keyName={title} style={styles.subtitle} />
            </View>
            <Heading1 keyName={title2} style={styles.title} />
          </View>
          <Heading4 keyName={description} style={{textAlign: 'center', color: colors.white}} />
          <Heading4 keyName={description2} style={{textAlign: 'center', color: colors.brightTurquoise}} />
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
    height: '78%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subtitleView: {
    height: '24%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'normal',
  },
  title: {
    textAlign: 'center',
    color: colors.brightTurquoise,
    lineHeight: 48,
  },
})
