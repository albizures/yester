import React from 'react'
import PropTypes from 'prop-types'

const { Provider, Consumer } = React.createContext()

export const UserProvider = Provider

export const shapeContextUser = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    country: PropTypes.string,
    state: PropTypes.string,
    birthDate: PropTypes.string,
    gender: PropTypes.string,
    locale: PropTypes.string,
    birthPlace: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }),
}

export default (Component) => {
  const withUser = (props) => {
    return <Consumer>{(data) => <Component contextUser={data} {...props} />}</Consumer>
  }

  return withUser
}
