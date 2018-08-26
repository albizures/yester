import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Question from '../Question'

const navigation = { navigate: jest.fn() }

describe('src/screens/ConfirmEmail.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Question navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to writing is pressed', () => {
    it('should navigate to Writing screen', () => {
      const shallowQuestion = shallow(<Question navigation={navigation} />)
      const shallowTouchableHighlights = shallowQuestion.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Writing')
    })
  })
})
