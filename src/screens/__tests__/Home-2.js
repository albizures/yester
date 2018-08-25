import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Home2 from '../Home-2'

const navigation = { navigate: jest.fn() }

describe('src/screens/ConfirmEmail.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Home2 navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to home 3 is pressed', () => {
    it('should navigate to Home3 screen', () => {
      const shallowHome2 = shallow(<Home2 navigation={navigation} />)
      const shallowTouchableHighlights = shallowHome2.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home3')
    })
  })
})
