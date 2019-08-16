import Purchases from 'react-native-purchases'
import { REVENUECAT_API_KEY } from 'react-native-dotenv'
import { Alert } from 'react-native'
import debugFactory from 'debug'
import { saveUserSubscriptionStatus, removeSubscription, updateUserAttribute } from './session'
import moment from 'moment'

const debugError = debugFactory('yester:purchase:error')
const debugInfo = debugFactory('yester:purchase:info')

export const status = {
  EXPIRE_SUBSCRIPTION: '2',
  SUBSCRIBED: '1',
}

export const eventTypes = {
  INFO: 'INFO',
  RESTORE: 'RESTORE',
  PURCHASE: 'PURCHASE',
}

export const setupPurchases = async (user) => {
  try {
    Purchases.setDebugLogsEnabled(false)
    Purchases.setup(REVENUECAT_API_KEY, user.userId)
    Purchases.setAllowSharingStoreAccount(true)
  } catch (error) {
    debugError('setupPurchases', error)
  }
}

export const getEntitlements = async () => {
  try {
    const entitlements = await Purchases.getEntitlements()
    debugInfo('Available entitlements:', entitlements)
    return entitlements
  } catch (error) {
    debugError('getEntitlements', error)
  }
}

export const getPurchaserInfo = async () => {
  try {
    const purchaserInfo = await Purchases.getPurchaserInfo()
    debugInfo('Purchaser info:', purchaserInfo)
    return purchaserInfo
  } catch (error) {
    debugError('getPurchaserInfo:', error)
  }
}

export const buySubscription = async (productId) => {
  try {
    const purchaseMade = await Purchases.makePurchase(productId)

    if (purchaseMade.purchaserInfo.activeEntitlements.length === 0) {
      try {
        await removeSubscription()
      } catch (error) {
        debugError('removeSubscription', error)
      }
      return Alert.alert("We couldn't process your payment")
    }

    const { activeSubscriptions = [] } = purchaseMade.purchaserInfo
    if (activeSubscriptions.length === 0) {
      return Alert.alert("We couldn't process your payment")
    }

    try {
      await saveUserSubscriptionStatus(status.SUBSCRIBED)
      await updateUserAttribute('trial_date', moment().format())
    } catch (error) {
      Alert.alert("We couldn't update your suscription, please contact us")
    }
  } catch (e) {
    if (!e.userCancelled) {
      debugError(`Error handling ${JSON.stringify(e)}`)
      debugError(e.code, e.message, e)
      Alert.alert(`We couldn't process your payment`)
    } else {
      debugError(`User cancelled ${JSON.stringify(e)}`)
      debugError(e.code, e.message, e)
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
  } catch (e) {
    debugError('Restoring: ', e)
    Alert.alert(`We couldn't process your restore transaction.`)
  }
}
