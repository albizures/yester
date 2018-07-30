import React from 'react'
import { shallow } from 'enzyme'
import { View, StatusBar } from 'react-native'

import App from '../'
import http from '../utils/http'

describe('src/index.js', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should render a View full width', () => {
    const shallowApp = shallow(<App />)
    expect(shallowApp.type()).toBe(View)
  })

  it('should set bar style as `light content`', () => {
    const shallowApp = shallow(<App />)
    const shallowBar = shallowApp.find(StatusBar)
    expect(shallowBar.prop('barStyle')).toBe('light-content')
  })

  describe('when the app has been mounted', () => {
    it('should make a GET request', async () => {
      http.get = jest.fn(() => Promise.resolve({ data: 'test' }))
      await App.prototype.componentDidMount()

      expect(http.get).toHaveBeenCalledTimes(1)
    })
  })
})
