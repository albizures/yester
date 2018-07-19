import React from 'react'
import { shallow } from 'enzyme'
import { View, StatusBar } from 'react-native'

import App from '../'

describe('src/index.js', () => {
  it('should render a View full width', () => {
    const shallowApp = shallow(<App />)
    expect(shallowApp.type()).toBe(View)
  })

  it('should set bar style as `light content`', () => {
    const shallowApp = shallow(<App />)
    const shallowBar = shallowApp.find(StatusBar)
    expect(shallowBar.prop('barStyle')).toBe('light-content')
  })
})
