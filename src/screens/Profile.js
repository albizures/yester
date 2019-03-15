import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import { Heading2, Description, Heading3 } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import Divider from '../components/Divider'
import colors from '../utils/colors'
import icons from '../utils/icons'
import withUser, { shapeContextUser } from '../components/withUser'

class Profile extends Component {
  static propTypes = {
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
  }

  render () {
    const { name, email, country, state, gender } = this.props.contextUser.user

    const topBar = <TopBar title='profile.title' />
    return (
      <Container topBar={topBar} style={styles.container}>
        <View style={styles.topFlex}>
          <Image
            source={gender === 'male' ? icons.profileMan : icons.profileWoman}
            style={styles.image}
          />
          <Heading2 text={name} style={styles.nameText} />
          {
            // TODO get the number of stories
            // <Heading5 text='3 stories' style={{marginBottom: 30}} />
          }
        </View>

        <View style={styles.bottomFlex}>
          <Divider style={{ width: 323 }} />
          <View style={styles.item}>
            <Description keyName='profile.email' />
            <Heading3 text={email} />
          </View>
          <Divider style={{ width: 323 }} />
          <View style={styles.item}>
            <Description keyName='profile.location' />
            {
              // TODO get the country and state correct name
            }
            <Heading3 text={`${country}, ${state ? state.substring(3, 5) : ''}`} />
          </View>
          <Divider style={{ width: 323 }} />
        </View>
      </Container>
    )
  }
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  topFlex: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.06,
  },
  bottomFlex: {
    flex: 0.65,
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
  },
  nameText: {
    marginTop: 17,
    color: colors.governorBay,
  },
  image: {
    width: 100,
    height: 100,
  },
  item: {
    width: 300,
    height: 80,
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
})

export default withUser(Profile)
