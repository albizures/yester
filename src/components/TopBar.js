import React from 'react'
import { View, TouchableHighlight, Image, Platform, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'
import Translate from './Translate'

const top = Platform.OS === 'ios' ? 20 : 0

const getBackIcon = (modal, transparent) => {
  if (transparent) {
    return modal
      ? require('../assets/chevron/chevron-down.png')
      : require('../assets/arrows/arrow-left.png')
  }

  return modal
    // TODO add the white down chevro asset
    ? require('../assets/chevron/chevron-down.png')
    : require('../assets/arrows/arrow-left-white.png')
}

const TopBar = (props) => {
  const { title, onBack, modal, action, transparent } = props
  const titleElemet = typeof title === 'string' ? (
    <Translate style={styles.text} keyName={title} />
  ) : title

  const backIcon = getBackIcon(modal, transparent)

  const containerStyles = [].concat(
    styles.container,
    transparent ? [styles.containerTransparent] : []
  )
  return (
    <View style={containerStyles}>
      {onBack ? (
        <TouchableHighlight onPress={onBack} style={styles.containerBack}>
          <Image source={backIcon} style={styles.back} />
        </TouchableHighlight>
      ) : null}
      {titleElemet}
      {action && (
        <View style={styles.action}>
          {action}
        </View>
      )}
    </View>
  )
}

TopBar.propTypes = {
  modal: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.node,
  action: PropTypes.node,
  transparent: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 60 + top,
    paddingTop: top,
    flexDirection: 'row',
    backgroundColor: colors.haiti,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  action: {
    position: 'absolute',
    top: 26,
    paddingTop: 10,
    right: 10,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerBack: {
    position: 'absolute',
    top: 24,
    paddingTop: 16,
    left: 10,
  },
  back: {
    height: 20,
    width: 20,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  containerTransparent: {
    backgroundColor: 'transparent',
  },
})

export default TopBar
