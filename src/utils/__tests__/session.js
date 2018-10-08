
import { Auth } from 'aws-amplify'
import { mockInstace } from 'axios'
import { saveUserToken, logIn } from '../session'

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn(),
  },
}))

describe('#saveUserToken', () => {
  it('save the user token', async () => {
    await saveUserToken()
    expect(mockInstace.defaults.headers.common.Authorization).toContain('Bearer ')
  })
})

describe('#logIn', () => {
  it('should return a rejected promise', async () => {
    const username = 'userTest'
    const password = '1234asdf'
    await logIn(username, password)
    expect(Auth.signIn).toBeCalledWith(username, password)
  })
})
