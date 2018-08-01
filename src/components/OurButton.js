import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, ViewPropTypes, Text, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const gradientColors = ['#4444B2', '#37D0D0']

const OurButton = (props) => {
  return (
    <TouchableHighlight {...props} elevation={10} style={[props.style, styles.button]}>
      <LinearGradient start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={styles.gradient} colors={gradientColors}>
        <Text style={styles.text}>{props.title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  )
}

OurButton.propTypes = {
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

export default OurButton
