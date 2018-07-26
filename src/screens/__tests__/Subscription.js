import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Subscription from '../Subscription'
const navigation = {
  navigate: jest.fn(),
}

describe('src/screens/Subscription.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Subscription navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to free trail is pressed', () => {
    it('should navigate to SignUp screen', () => {
      const shallowSubscription = shallow(<Subscription navigation={navigation} />)
      const shallowButton = shallowSubscription.find(Button)
      shallowButton.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Login')
    })
  })
})
