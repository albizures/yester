import React from 'react'
import renderer from 'react-test-renderer'

import AccountSetup from '../'

const navigation = {
  navigate: jest.fn(),
}

describe('src/screens/AccountSetup', () => {
  it('should render', () => {
    const tree = renderer.create(<AccountSetup navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
