import React from 'react'
import { shallow } from 'enzyme'
import { TouchableHighlight } from 'react-native'

import OurButton from '../OurButton'

describe('src/components/OurButton.js', () => {
  it('should render a TouchableHighlight', () => {
    const shallowOurButton = shallow(<OurButton title='Button' />)
    expect(shallowOurButton.type()).toBe(TouchableHighlight)
  })
})
