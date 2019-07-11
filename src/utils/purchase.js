import Purchases from 'react-native-purchases'
import { REVENUECAT_API_KEY } from 'react-native-dotenv'
import { Alert } from 'react-native'
import debugFactory from 'debug'
import { getUser, saveUserSubscriptionStatus, removeSubscription } from './session'

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

export const setupPurchases = async () => {
  try {
    const user = await getUser()
    Purchases.setDebugLogsEnabled(false)
    Purchases.setup(REVENUECAT_API_KEY, user.username)
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
        console.error('removeSubscription', error)
      }
      return Alert.alert("We couldn't process your payment")
    }

    const { activeSubscriptions = [] } = purchaseMade.purchaserInfo
    if (activeSubscriptions.length === 0) {
      return Alert.alert("We couldn't process your payment")
    }

    try {
      await saveUserSubscriptionStatus(status.SUBSCRIBED)
    } catch (error) {
      Alert.alert("We couldn't update your suscription, please contact us")
    }
  } catch (e) {
    if (!e.userCancelled) {
      console.log(`Error handling ${JSON.stringify(e)}`)
      debugError(e.code, e.message)
      Alert.alert(`We couldn't process your payment`)
    } else {
      console.log(`User cancelled ${JSON.stringify(e)}`)
      Alert.alert('Process has been cancelled')
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
