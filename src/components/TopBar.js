import React from 'react'
import { View, TouchableHighlight, Image, Platform, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'
import Translate from './Translate'

const top = Platform.OS === 'ios' ? 20 : 0

const TopBar = ({ icon, title, onBack, modal }) => {
  const titleElemet = typeof title === 'string' ? (
    <Translate style={styles.text} keyName={title} />
  ) : title

  const backIcon = modal
    ? require('../assets/chevron/chevron-down.png')
    : require('../assets/arrows/arrow-left-white.png')

  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableHighlight onPress={onBack} style={styles.containerBack}>
          <Image source={backIcon} style={styles.back} />
        </TouchableHighlight>
      ) : null}
      {titleElemet}
    </View>
  )
}

TopBar.propTypes = {
  icon: PropTypes.number,
  modal: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.node.isRequired,
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
})

export default TopBar
