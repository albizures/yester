import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { TouchableHighlight } from 'react-native'

import CreateAccount from '../CreateAccount'
const navigation = {
  navigate: jest.fn(),
}

describe('src/screens/CreateAccount.js', () => {
  it('should render', () => {
    const tree = renderer.create(<CreateAccount navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to free trial is pressed', () => {
    it('should navigate to Facebook screen', () => {
      const shallowCreateAccount = shallow(<CreateAccount navigation={navigation} />)
      const shallowTouchableHighlights = shallowCreateAccount.find(TouchableHighlight)
      const shallowButtonToFacebook = shallowTouchableHighlights.at(0)
      const shallowButtonToSignIn = shallowTouchableHighlights.at(1)

      shallowButtonToFacebook.prop('onPress')()
      shallowButtonToSignIn.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(2)
      expect(navigation.navigate).toHaveBeenCalledWith('Facebook')
      expect(navigation.navigate).toHaveBeenCalledWith('SignIn')
    })
  })
})
