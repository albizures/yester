
export const Auth = {
  federatedSignIn: jest.fn().mockResolvedValue({ sessionToken: '1234567' }),
  currentSession: jest.fn().mockResolvedValue({
    accessToken: {
      jwtToken: '12345qwert',
    },
  }),
  signIn: jest.fn().mockResolvedValue({}),
}

export default {
  configure: jest.fn(),
}
