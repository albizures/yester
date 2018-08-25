import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Login from '../Login'

const navigation = { navigate: jest.fn() }

describe('src/screens/Login.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Login navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to home is pressed', () => {
    it('should navigate to Home screen', () => {
      const shallowLogin = shallow(<Login navigation={navigation} />)
      const shallowTouchableHighlights = shallowLogin.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
