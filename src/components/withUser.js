import React from 'react'
import PropTypes from 'prop-types'

const { Provider, Consumer } = React.createContext()

export const UserProvider = Provider

export const shapeContextUser = {
  updateUser: PropTypes.func.isRequired,
  updateStats: PropTypes.func.isRequired,
  user: PropTypes.shape({
    country: PropTypes.string,
    state: PropTypes.string,
    birthDate: PropTypes.string,
    gender: PropTypes.string,
    locale: PropTypes.string,
    birthPlace: PropTypes.string,
    platform: PropTypes.string,
    notifications: PropTypes.boolean,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    emailVerified: PropTypes.boolean,
    created: PropTypes.string,
    purchaserInfo: PropTypes.object,
  }),
  stats: PropTypes.shape({
    questionCounter: PropTypes.number,
    storyCounter: PropTypes.number,
    lastAnswer: PropTypes.string,
    lastQuestion: PropTypes.string,
    maxLength: PropTypes.number,
  }),
}

export default (Component) => {
  const withUser = (props) => {
    return <Consumer>{(data) => <Component contextUser={data} {...props} />}</Consumer>
  }

  return withUser
}
