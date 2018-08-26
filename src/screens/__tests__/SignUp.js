import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Button from '../../components/Button'

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
    it('should navigate to SignUp2 screen', () => {
      const shallowLogin = shallow(<SignUp navigation={navigation} />)
      const shallowTouchableHighlights = shallowLogin.find(Button)
      const shallowButtonToSubscription = shallowTouchableHighlights.at(0)
      shallowButtonToSubscription.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('SignUp2')
    })
  })

  describe('when button Log in is pressed', () => {
    it('should navigate to Login screen', () => {
      const shallowLogin = shallow(<SignUp navigation={navigation} />)
      const shallowTouchableHighlights = shallowLogin.find(Button)
      const shallowButtonToLogin = shallowTouchableHighlights.at(1)
      shallowButtonToLogin.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(2)
      expect(navigation.navigate).toHaveBeenCalledWith('Login')
    })
  })
})
