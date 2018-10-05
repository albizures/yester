import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Trasnlate from '../../components/Translate'
import Container from '../../components/Container'

export default class Done extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
  }
  render () {
    const { year } = this.props
    return (
      <Container>
        <Trasnlate keyName='setup.place.title' data={{ year }} />
        <Trasnlate keyName='setup.place.subtitle' />
        <Trasnlate keyName='setup.place.form.title' />
      </Container>
    )
  }
}
