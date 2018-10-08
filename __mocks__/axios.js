export const mockGet = jest.fn()
export const mockPost = jest.fn()
export const mockPut = jest.fn()
export const mockDelete = jest.fn()
export const mockInstaceGet = jest.fn()
export const mockInstacePost = jest.fn()
export const mockInstacePut = jest.fn()
export const mockInstaceDelete = jest.fn()
export const mockInstace = {
  get: mockInstaceGet,
  post: mockInstacePost,
  put: mockInstacePut,
  delete: mockInstaceDelete,
  defaults: {
    headers: {
      common: {},
    },
  },
}

export default {
  get: mockGet,
  post: mockPost,
  put: mockPut,
  delete: mockDelete,
  create: () => mockInstace,
}
