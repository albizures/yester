import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Onboarding from '../Onboarding'
const navigation = {
  navigate: jest.fn(),
}

describe('src/screens/Onboarding.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Onboarding navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to free trail is pressed', () => {
    it('should navigate to StartTrial screen', () => {
      const shallowLogin = shallow(<Onboarding navigation={navigation} />)
      const shallowButton = shallowLogin.find(Button)
      shallowButton.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('StartTrial')
    })
  })
})
