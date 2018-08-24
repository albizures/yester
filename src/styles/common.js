import { StyleSheet, Dimensions } from 'react-native'
import colors from '../utils/colors'

const { height, width } = Dimensions.get('window')
const fontColor = colors.fontColor
const mainColor = colors.mainColor
const white = colors.white
const blurColor = colors.blurColor

export default StyleSheet.create({
  container: {
    padding: width * 0.05,
    flex: 1,
    flexDirection: 'column',
  },
  display2: {
    color: fontColor,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title: {
    color: fontColor,
    fontSize: 20,
    textAlign: 'left',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: white,
  },
  body1: {
    color: fontColor,
    fontSize: 16,
    textAlign: 'center',
  },
  body2: {
    color: fontColor,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  notColor: {
    color: mainColor,
  },
  button: {
    padding: height * 0.02,
  },
  filledButton: {
    backgroundColor: colors.governorBay,
    borderRadius: height * 0.04,
    borderWidth: 2,
    borderColor: colors.governorBay,
  },
  outlinedButton: {
    backgroundColor: white,
    borderRadius: height * 0.04,
    borderWidth: 2,
    borderColor: mainColor,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
  },
  divider: {
    height: height * 0.01,
    backgroundColor: blurColor,
    borderRadius: height * 0.04,
    borderWidth: 1,
    borderColor: blurColor,
  },
})
