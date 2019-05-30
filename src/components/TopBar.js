import React from 'react'
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native'
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
  // TODO add the white down chevro asset
  return modal
    ? require('../assets/chevron/chevron-down.png')
    : require('../assets/arrows/arrow-left-white.png')
}

const TopBar = (props) => {
  const { title, onBack, modal, action, transparent } = props
  const titleElement =
    typeof title === 'string' ? (
      <View style={styles.titleView}>
        <StatusBar barStyle='light-content' />
        <Title keyName={title} style={styles.text} />
      </View>
    ) : (
      title
    )

  const topBarHeight = {
    height: titleElement != null ? titleElement.props.style.height : 51,
  }

  const backIcon = getBackIcon(modal, transparent)

  const safeAreaStyles = [].concat(
    styles.safeArea,
    transparent ? [styles.containerTransparent] : []
  )
  return (
    <SafeAreaView style={safeAreaStyles}>
      <View style={styles.container}>
        {!transparent ? (
          <View style={[styles.backgrounContainer, topBarHeight]}>
            <Image source={icons.header} style={styles.backgrounImage} />
          </View>
        ) : null}
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.leftView}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
        ) : null}
        {titleElement}
        {action && <View style={styles.rightView}>{action}</View>}
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
    minHeight: 51,
  },
  leftView: {
    position: 'absolute',
    zIndex: 1,
    width: 50,
    height: 51,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightView: {
    position: 'absolute',
    width: 110,
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
  backgrounContainer: {
    position: 'absolute',
    zIndex: 0,
    justifyContent: 'flex-end',
  },
  backgrounImage: {
    width: width,
    height: 51,
  },
})

export default TopBar
