import React from 'react'
import { View, TouchableHighlight, Image, Platform } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'
import Translate from './Translate'

const top = Platform.OS === 'ios' ? 20 : 0

const TopBar = ({ icon, title, onBack, modal }) => {
  const backIcon = modal ? require('../assets/chevron/chevron-down.png') : require('../assets/chevron/chevron-left.png')

  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableHighlight onPress={onBack} style={styles.containerBack}>
          <Image source={backIcon} style={styles.back} />
        </TouchableHighlight>
      ) : null}
      <Translate style={styles.text} keyName={title} />
    </View>
  )
}

TopBar.propTypes = {
  icon: PropTypes.number,
  modal: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.string.isRequired,
}

const styles = {
  icon: {
    marginRight: 12,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerBack: {
    position: 'absolute',
    top: 24,
    left: 20,
  },
  back: {
    height: 20,
    width: 10,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  container: {
    width: '100%',
    height: 50 + top,
    paddingTop: top,
    flexDirection: 'row',
    backgroundColor: colors.haiti,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default TopBar
