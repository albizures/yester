import React from 'react'
import { shallow } from 'enzyme'
import { WebView } from 'react-native'

import Facebook from '../Facebook'

const uri = 'https://tatalapp.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=2u2fhefrj53r2fhrs967422d3l&redirect_uri=https://twitter.com'

describe('src/screens/Facebook.js', () => {
  it('should render a WebView', () => {
    const shallowApp = shallow(<Facebook />)
    expect(shallowApp.type()).toBe(WebView)

    const props = shallowApp.props()
    expect(props.source).toEqual({ uri })
    expect(props.style).toEqual({ marginTop: 20 })
  })
})
