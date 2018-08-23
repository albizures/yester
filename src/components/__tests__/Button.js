import React from 'react'
import { shallow } from 'enzyme'
import { TouchableHighlight } from 'react-native'

import Button from '../Button'

describe('src/components/Button.js', () => {
  it('should render a TouchableHighlight', () => {
    const shallowButton = shallow(<Button title='Button' />)
    expect(shallowButton.type()).toBe(TouchableHighlight)
  })
})
