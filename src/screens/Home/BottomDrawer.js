import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native'
import Modal from 'react-native-modal'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Title, Heading5, Body1 } from '../../components'
import Button from '../../components/Button'
import Divider from '../../components/Divider'
import { subscriptionStatus } from '../../utils/session'

const BottomDrawer = ({ props, visible, onOk, onSubscribe }) => {
  const {
    contextUser: { currentStatus, stats, user },
  } = props
  const { givenName } = user

  const completed = stats.storyCounter ? Math.round((stats.storyCounter / 305) * 100) : 0

  const showLeft = currentStatus === subscriptionStatus.PREVIEW
  let left = 5 - stats.storyCounter
  left = left < 0 ? 0 : left

  let actions = (
    <View style={{ width: '100%' }}>
      <Title style={styles.secondTitle} keyName='home.bottomDrawer.secondTitle' />
      <View style={styles.statsRow}>
        <Image source={icons.pieChart} style={{ width: 22, height: 22, marginRight: 12 }} />
        <Text style={{ textAlignVertical: 'top', marginRight: 23 }}>
          <Heading5 keyName='home.bottomDrawer.stories1' />
          <Heading5
            style={{ fontWeight: 'bold' }}
            keyName='home.bottomDrawer.stories2'
            data={{ storyCounter: stats.storyCounter }}
          />
          <Heading5 keyName='home.bottomDrawer.stories3' />
          <Heading5
            style={{ fontWeight: 'bold' }}
            keyName='home.bottomDrawer.stories4'
            data={{ completed }}
          />
          <Heading5 keyName='home.bottomDrawer.stories5' />
        </Text>
      </View>
      <View style={styles.actionsRow}>
        <Body1 style={styles.secondAction} text=' ' onPress={onOk} />
        <Button title='home.bottomDrawer.button.ok' onPress={onOk} style={styles.button} />
      </View>
    </View>
  )
  if (showLeft) {
    actions = (
      <View style={{ width: '100%' }}>
        <View style={styles.statsRow}>
          <Image source={icons.alertCircle} style={{ width: 22, height: 22, marginRight: 12 }} />
          <Heading5
            style={{ fontStyle: 'italic', textAlignVertical: 'top', marginRight: 23 }}
            keyName='home.bottomDrawer.storiesLeft'
            data={{ left: left }}
          />
        </View>
        <View style={styles.actionsRow}>
          <Body1 style={styles.secondAction} keyName='home.bottomDrawer.dismiss' onPress={onOk} />
          <Button
            title='home.bottomDrawer.button.subscribe'
            onPress={onSubscribe}
            style={styles.button}
          />
        </View>
      </View>
    )
  }

  return (
    <Modal
      isVisible={visible}
      backdropColor='transparent'
      swipeDirection='down'
      onSwipeComplete={onOk}
      onBackButtonPress={onOk}
      onBackdropPress={onOk}
      animationInTiming={500}
      animationOutTiming={500}
      style={{ margin: 0 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.card}>
          <View style={styles.container}>
            <View style={styles.divider} />
            <Title
              style={styles.title}
              keyName='home.bottomDrawer.title'
              data={{ name: givenName }}
            />
            <Heading5 style={{ marginBottom: 33 }} keyName='home.bottomDrawer.message' />

            <Divider style={{ width: 323, marginBottom: 18 }} />

            {actions}
          </View>
        </View>
      </View>
    </Modal>
  )
}

BottomDrawer.propTypes = {
  props: PropTypes.object.isRequired,
  contextUser: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
}

export default BottomDrawer

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modalContainer: {
    width,
    height,
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    height: 360,
    // overflow: 'hidden',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderWidth: 0.5,
    backgroundColor: colors.white,
    borderColor: colors.white,
    shadowColor: colors.questionCardShadow,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: {
      height: 30,
    },
  },
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingHorizontal: 23,
  },
  divider: {
    width: 97,
    height: 3,
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 1.5,
    borderColor: colors.mischka,
    backgroundColor: colors.mischka,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 33,
    marginBottom: 13,
  },
  secondTitle: {
    color: colors.governorBay,
    fontWeight: 'bold',
    marginBottom: 13,
  },
  statsRow: {
    maxWidth: '100%',
    flexDirection: 'row',
    marginRight: 23,
  },
  actionsRow: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 27,
  },
  button: { width: 150 },
  secondAction: {
    textDecorationLine: 'underline',
    color: colors.governorBay,
  },
})
