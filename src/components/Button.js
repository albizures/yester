import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, ViewPropTypes, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../utils/colors'
import Translate from '../components/Translate'

const gradientColors = [colors.gradient1, colors.gradient2]

const Button = (props) => {
  return (
    <TouchableHighlight {...props} elevation={10} style={[props.style, styles.button]}>
      <LinearGradient start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={styles.gradient} colors={gradientColors}>
        <Translate style={styles.text} keyName={props.title} />
      </LinearGradient>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
}

let { height } = Dimensions.get('window')
const styles = {
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height * 0.04,
  },
  button: {
    height: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: height * 0.04,
    // backgroundColor: '#b98a56',
    width: '100%',
  },
  text: {
    // marginVertical: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}

export default Button
