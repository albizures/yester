import React from 'react'

const { Provider, Consumer } = React.createContext()

export const UserProvider = Provider

export default (Component) => {
  const withUser = (props) => {
    return (
      <Consumer>
        {(data) => <Component {...data} {...props} /> }
      </Consumer>
    )
  }

  return withUser
}
