import { getCurrentProfile } from '../fbHelper'
import { GraphRequest } from 'react-native-fbsdk'

const mockError = new Error('some error')

GraphRequest.mockImplementation((route, config, callback) => {
  callback(mockError)
})

describe('#getCurrentProfile', () => {
  describe('when the request fails', () => {
    it('should return a rejected promise', async () => {
      try {
        await getCurrentProfile()
      } catch (error) {
        expect(error).toEqual(mockError)
      }
    })
  })
})
