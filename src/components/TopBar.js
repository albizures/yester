import React from 'react'
import { SafeAreaView, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import icons from '../utils/icons'
import colors from '../utils/colors'
import { Title } from './'

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
  let titleElement = title
  if (typeof title === 'string') {
    titleElement = <Title keyName={title} style={styles.text} />
  }

  const backIcon = getBackIcon(modal, transparent)

  const safeAreaStyles = [].concat(
    styles.safeArea,
    transparent ? [styles.containerTransparent] : []
  )
  return (
    <SafeAreaView style={safeAreaStyles}>
      {!transparent ? (
        <View style={[styles.backgrounContainer]}>
          <Image source={icons.header} style={styles.backgrounImage} />
        </View>
      ) : null
      }
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.leftFlex}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.middleFlex}>
        {titleElement}
      </View>
      {action && (
        <View style={styles.rightFlex}>
          {action}
        </View>
      )}
    </SafeAreaView>
  )
}

TopBar.propTypes = {
  modal: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.node,
  action: PropTypes.node,
  transparent: PropTypes.bool,
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  safeArea: {
    width,
    height: 61,
    backgroundColor: colors.haiti,
  },
  leftFlex: {
    position: 'absolute',
    zIndex: 1,
    width: 50,
    minHeight: 61,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  middleFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightFlex: {
    position: 'absolute',
    width: 70,
    minHeight: 61,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  containerTransparent: {
    backgroundColor: 'transparent',
  },
  backgrounContainer: {
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'flex-end',
  },
  backgrounImage: {
    width: width,
    height: 61,
  },
})

export default TopBar
