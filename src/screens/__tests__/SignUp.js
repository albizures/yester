import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { TouchableHighlight } from 'react-native'

import SignUp from '../SignUp'
const navigation = {
  navigate: jest.fn(),
}

describe('src/screens/SignUp.js', () => {
  it('should render', () => {
    const tree = renderer.create(<SignUp navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to free trial is pressed', () => {
    it('should navigate to SignUp screen', () => {
      const shallowLogin = shallow(<SignUp navigation={navigation} />)
      const shallowTouchableHighlights = shallowLogin.find(TouchableHighlight)
      const shallowButtonToSubscription = shallowTouchableHighlights.at(0)
      const shallowButtonToLogin = shallowTouchableHighlights.at(1)

      shallowButtonToLogin.prop('onPress')()
      shallowButtonToSubscription.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(2)
      expect(navigation.navigate).toHaveBeenCalledWith('Subscription')
      expect(navigation.navigate).toHaveBeenCalledWith('Login')
    })
  })
})
