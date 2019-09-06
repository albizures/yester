import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Modal, Image, Dimensions } from 'react-native'
import colors from '../../utils/colors'
import { Title, Heading5, Body1 } from '../../components'
import Button from '../../components/Button'
import Divider from '../../components/Divider'
import { subscriptionStatus } from '../../utils/session'

const BottomDrawer = ({ props, visible, onOk, onSubscribe }) => {
  const {
    contextUser: { currentStatus, stats, user },
  } = props
  const { givenName } = user

  const conditionalText = {
    [subscriptionStatus.ODD_REQUIRE.code]: {
      message: 'home.alertItem.message.trial',
    },
    [subscriptionStatus.EVEN_REQUIRE.code]: {
      message: 'home.alertItem.message.trial',
    },
    [subscriptionStatus.EXPIRED.code]: {
      message: 'home.alertItem.message.expired',
    },
  }

  const text = conditionalText[currentStatus.code]

  const showLeft = currentStatus === subscriptionStatus.PREVIEW
  let left = 5 - stats.storyCounter
  left = left < 0 ? 0 : left
  let actions = (
    <View style={styles.actionsRow}>
      <Body1 style={styles.secondAction} keyName='home.bottomDrawer.dismiss' onPress={onOk} />
      <Button title='home.bottomDrawer.button.ok' onPress={onOk} style={styles.button} />
    </View>
  )
  if (showLeft) {
    actions = (
      <View style={{ width: '100%' }}>
        <Divider style={{ width: 323, marginBottom: 18 }} />
        <View style={{ flexDirection: 'row' }}>
          <Image />
          <Heading5
            style={{ fontStyle: 'italic', marginBottom: 37 }}
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
    <Modal animationType='slide' transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={[styles.card, { height: showLeft ? 350 : 225 }]}>
          <View style={styles.contentBottom}>
            <View style={styles.divider} />
            <Title
              style={styles.title}
              keyName='home.bottomDrawer.title'
              data={{ name: givenName }}
            />
            <Heading5 style={{ marginBottom: 33 }} keyName='home.bottomDrawer.message' />

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
    width,
    height: 226,
    overflow: 'hidden',
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
  contentBottom: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 27,
    paddingTop: 12,
    paddingHorizontal: 23,
  },
  divider: {
    width: 97,
    height: 3,
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
  actionsRow: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: { width: 150 },
  secondAction: {
    textDecorationLine: 'underline',
    color: colors.governorBay,
  },
})
