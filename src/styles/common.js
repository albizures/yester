import { StyleSheet, Dimensions } from 'react-native'

let { height, width } = Dimensions.get('window')
let fontColor = '#309BF8'

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
    color: '#fff',
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
    color: '#309BF8',
  },
  button: {
    padding: height * 0.02,
  },
  filledButton: {
    backgroundColor: '#309BF8',
    borderRadius: height * 0.04,
    borderWidth: 2,
    borderColor: '#309BF8',
  },
  outlinedButton: {
    backgroundColor: '#fff',
    borderRadius: height * 0.04,
    borderWidth: 2,
    borderColor: '#309BF8',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderBottomColor: '#309BF8',
    borderBottomWidth: 1,
  },
})
