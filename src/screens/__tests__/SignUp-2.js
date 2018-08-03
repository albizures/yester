import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import SignUp2 from '../SignUp-2'
const navigation = {
  navigate: jest.fn(),
}

describe('src/screens/SignUp-2.js', () => {
  it('should render', () => {
    const tree = renderer.create(<SignUp2 navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to free trail is pressed', () => {
    it('should navigate to SignUp screen', () => {
      const shallowSubscription = shallow(<SignUp2 navigation={navigation} />)
      const shallowButton = shallowSubscription.find(Button)
      shallowButton.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('LogIn')
    })
  })
})
