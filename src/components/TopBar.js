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
  const titleElemet = typeof title === 'string' ? (
    <Title keyName={title} style={styles.text} />
  ) : title

  const backIcon = getBackIcon(modal, transparent)

  const safeAreaStyles = [].concat(
    styles.safeArea,
    transparent ? [styles.containerTransparent] : []
  )
  return (
    <SafeAreaView style={safeAreaStyles}>
      <View style={styles.container}>
        {!transparent ? (
          <Image source={icons.header} style={styles.backgrounImage} />
        ) : null
        }
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.leftFlex}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
        ) : null}
        <View style={styles.middleFlex}>
          {titleElemet}
        </View>
        {action && (
          <View style={styles.rightFlex}>
            {action}
          </View>
        )}
      </View>
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
    backgroundColor: colors.haiti,
  },
  container: {
    width,
    height: 51,
  },
  leftFlex: {
    position: 'absolute',
    zIndex: 1,
    width: 50,
    height: 51,
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
    minHeight: 51,
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
  backgrounImage: {
    position: 'absolute',
    zIndex: 0,
    width: width,
    height: 51,
    justifyContent: 'flex-end',
  },
})

export default TopBar
