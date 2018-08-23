import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Question2 from '../Question-2'

const navigation = { navigate: jest.fn() }

describe('src/screens/Question-2.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Question2 navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to reading is pressed', () => {
    it('should navigate to Reading screen', () => {
      const shallowConfirmEmail = shallow(<Question2 navigation={navigation} />)
      const shallowTouchableHighlights = shallowConfirmEmail.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Reading')
    })
  })
})
