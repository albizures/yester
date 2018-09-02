
export const Auth = {
  federatedSignIn: jest.fn().mockResolvedValue({ sessionToken: '1234567' }),
}

export default {
  configure: jest.fn(),
}
