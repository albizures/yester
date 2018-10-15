import { StyleSheet, Dimensions } from 'react-native'
import colors from '../utils/colors'

const { width } = Dimensions.get('window')
const fontColor = colors.mineShaft
const mainColor = colors.governorBay

export default StyleSheet.create({
  container: {
    padding: width * 0.05,
    flex: 1,
    flexDirection: 'column',
  },
  h1: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  h2: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  h3: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  h4: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 18,
    textAlign: 'left',
  },
  h5: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 16,
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
})
