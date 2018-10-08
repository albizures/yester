export const LoginManager = {
  logInWithReadPermissions: jest.fn().mockResolvedValue({ isCancelled: false }),
}

export const AccessToken = {
  getCurrentAccessToken: jest.fn().mockResolvedValue({
    accessToken: '2345678', expirationTime: 12345678,
  }),
}

export const GraphRequest = jest.fn().mockImplementation((route, config, callback) => {
  callback(undefined, {})
})

export const mockStart = jest.fn()
export const mockAddRequest = jest.fn().mockImplementation(() => ({
  start: mockStart,
}))
export const GraphRequestManager = jest.fn().mockImplementation(() => ({
  addRequest: mockAddRequest,
}))
