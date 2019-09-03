import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../utils/colors'
import { Title, Heading3 } from '../../components'
import { subscriptionStatus } from '../../utils/session'

const AlertItem = (props) => {
  const { currentStatus, onPress } = props

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

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.topView}>
          <Title keyName='home.alertItem.title' style={styles.dayTopicText} />
        </View>
        <View style={styles.bottomView}>
          <View style={{ flex: 1 }}>
            <Heading3 keyName={text.message} numberOfLines={2} style={{ flexWrap: 'wrap' }} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.white,
    shadowColor: colors.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: {
      height: 8,
    },
  },
  topView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.bittersweet,
  },
  bottomView: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 5,
    alignItems: 'stretch',
  },
  newTextContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  newText: {
    color: colors.mineShaft,
    fontWeight: 'bold',
  },
  dayTopicText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})

AlertItem.propTypes = {
  currentStatus: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default AlertItem
