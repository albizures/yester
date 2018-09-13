import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import SignIn from '../SignIn'

const navigation = { navigate: jest.fn() }

describe.skip('src/screens/SignIn.js', () => {
  it('should render', () => {
    const tree = renderer.create(<SignIn navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to home is pressed', () => {
    it('should navigate to Home screen', () => {
      const shallowSignIn = shallow(<SignIn navigation={navigation} />)
      const shallowTouchableHighlights = shallowSignIn.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
