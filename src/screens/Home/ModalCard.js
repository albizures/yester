import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet } from 'react-native'

import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { capitalize } from '../../utils'

import Button, {types} from '../../components/Button'
import { Heading2, Heading5 } from '../../components'
import withAges, { shapeContextAges } from '../../components/withAges'

class ModalCard extends React.Component {
  static propTypes = {
    contextAges: PropTypes.shape(shapeContextAges).isRequired,
    navigation: PropTypes.object.isRequired,
  }

  onWrite = () => {
    const { navigation } = this.props

    const ageId = navigation.getParam('ageId')
    const questionId = navigation.getParam('questionId')
    const question = navigation.getParam('question')
    const storyId = navigation.getParam('storyId')

    navigation.replace('Writing', { ageId, questionId, question, storyId })
  }

  onSkip = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const { ages } = this.props.contextAges
    const ageId = navigation.getParam('ageId')
    // const category = navigation.getParam('category')
    const question = navigation.getParam('question')
    const age = (ages[ageId] || {}).name

    return (
      <View style={styles.modalContainer}>
        <View style={styles.card}>
          <View style={styles.container}>
            <Image source={icons.emptyCard} style={{width: 340, height: 250}} />
            <View style={{flex: 1, position: 'absolute', paddingTop: 27}}>
              <Heading5 text={capitalize(age)} style={{textAlign: 'center'}} />
            </View>

            <View style={styles.contentTop}>
              {/* <Heading2 text={capitalize(category)} style={{marginBottom: 10}} /> */}
              <Heading2 style={{textAlign: 'center'}} text={capitalize(question)} />
            </View>

            <View style={styles.contentBottom}>
              <Button title='questionCard.write' onPress={this.onWrite} style={{marginBottom: 20}} />
              <Button title='questionCard.skip' onPress={this.onSkip} type={types.OUTLINED} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default withAges(ModalCard)

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(98, 97, 232, 0.85)',
  },
  card: {
    height: 520,
    width: 340,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: colors.white,
    shadowColor: colors.questionCardShadow,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: {
      height: 30,
    },
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  contentTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  contentBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
})
