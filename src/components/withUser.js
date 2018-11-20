import React from 'react'

import PropTypes from 'prop-types'

const { Provider, Consumer } = React.createContext()

export const UserProvider = Provider
export const shapeContextUser = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    country: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }),
}

export default (Component) => {
  const withUser = (props) => {
    return (
      <Consumer>
        {(data) => <Component contextUser={data} {...props} /> }
      </Consumer>
    )
  }

  return withUser
}
