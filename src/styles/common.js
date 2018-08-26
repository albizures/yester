import { StyleSheet, Dimensions } from 'react-native'
import colors from '../utils/colors'

const { height, width } = Dimensions.get('window')
const fontColor = colors.mineShaft
const mainColor = colors.governorBay

export default StyleSheet.create({
  container: {
    padding: width * 0.05,
    flex: 1,
    flexDirection: 'column',
  },
  display2: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 20,
    textAlign: 'left',
  },
  body1: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 16,
    textAlign: 'center',
  },
  body2: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
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
    backgroundColor: colors.mischka,
    borderRadius: height * 0.04,
    borderWidth: 1,
    borderColor: colors.mischka,
  },
})
