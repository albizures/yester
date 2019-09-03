import Purchases from 'react-native-purchases'
import { REVENUECAT_API_KEY } from 'react-native-dotenv'
import { Alert } from 'react-native'
import debugFactory from 'debug'
import { saveUserSubscriptionStatus, subscriptionStatus } from './session'
import moment from 'moment'

const debugError = debugFactory('yester:purchase:error')
const debugInfo = debugFactory('yester:purchase:info')

export const eventTypes = {
  INFO: 'INFO',
  RESTORE: 'RESTORE',
  PURCHASE: 'PURCHASE',
}

export const setupPurchases = async (user) => {
  const { userId } = user
  try {
    Purchases.setup(REVENUECAT_API_KEY, userId)
    Purchases.setAllowSharingStoreAccount(true)
    Purchases.setDebugLogsEnabled(false)
  } catch (err) {
    debugError('setupPurchases', err)
  }
}

export const getEntitlements = async () => {
  try {
    const entitlements = await Purchases.getEntitlements()
    debugInfo('Available entitlements:', entitlements)
    return entitlements
  } catch (err) {
    debugError('getEntitlements', err)
  }
}

export const getPurchaserInfo = async () => {
  try {
    const purchaserInfo = await Purchases.getPurchaserInfo()
    return purchaserInfo
  } catch (err) {
    debugError('getPurchaserInfo:', err)
  }
}

export const makePurchase = async (productId) => {
  try {
    const { purchaserInfo } = await Purchases.makePurchase(productId)
    const { activeEntitlements = [], activeSubscriptions = [] } = purchaserInfo

    if (activeEntitlements.length === 0) {
      return Alert.alert("We couldn't process your payment")
    }

    if (activeSubscriptions.length === 0) {
      return Alert.alert("We couldn't process your payment")
    }

    try {
      await saveUserSubscriptionStatus(subscriptionStatus.PRO, purchaserInfo, moment().format())
    } catch (err) {
      debugError(err)
      Alert.alert("We couldn't update your suscription, please contact us")
    }
  } catch (err) {
    if (!err.userCancelled) {
      debugError(`Error handling ${JSON.stringify(err)}`)
      debugError(err.code, err.message, err)
      Alert.alert(`We couldn't process your payment`)
    } else {
      debugError(`User cancelled ${JSON.stringify(err)}`)
      debugError(err.code, err.message, err)
      Alert.alert(
        'Process has been cancelled.\n\nIf you already have a subscription with us 👍, please tap on Restore Subscription.'
      )
    }
  }
}

export const restoreSubscription = async () => {
  try {
    const restore = await Purchases.restoreTransactions()
    debugInfo('Restoring: ', restore)
    if (restore.activeEntitlements[0] === undefined) {
      Alert.alert(`You don't have an active subscription to be restored.`)
    } else {
      return Alert.alert('Great! Your subscription has been restored.')
    }
    return restore
  } catch (err) {
    debugError('Restoring: ', err)
    Alert.alert(`We couldn't process your restore transaction.`)
  }
}

export const resetPurchases = async () => {
  try {
    const resetObject = await Purchases.reset()
    debugInfo('Reseting: ', resetObject)
    return resetObject
  } catch (err) {
    debugError('Reseting: ', err)
  }
}

export const identifyPurchaser = async (user) => {
  const { userId } = user
  try {
    const purchaserInfo = await Purchases.identify(userId)
    debugInfo('identifyPurchaser: ', purchaserInfo)
    return purchaserInfo
  } catch (err) {
    debugError('identifyPurchaser: ', err)
  }
}
