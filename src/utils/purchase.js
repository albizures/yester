import Purchases from 'react-native-purchases'
import { REVENUECAT_API_KEY } from 'react-native-dotenv'
import { Alert } from 'react-native'
import { getUser } from './session'

export const status = {
  EXPIRE_SUBSCRIPTION: '2',
  SUBSCRIBED: '1',
}

export const eventTypes = {
  INFO: 'INFO',
  RESTORE: 'RESTORE',
  PURCHASE: 'PURCHASE',
}

export const setupRCPurchases = async () => {
  try {
    const user = await getUser()
    console.log('User Id', user)
    Purchases.setup(REVENUECAT_API_KEY, user.username)
  } catch (error) {
    console.log('setupRCPurchases', error)
  }
}

export const getEntitlements = async () => {
  try {
    const { pro } = await Purchases.getEntitlements()
    console.log('Entitlement:', pro)
    return pro
  } catch (error) {
    console.log('getEntitlements', error)
  }
}

export const buySubscription = (productId) => {
  try {
    Purchases.makePurchase(productId)
  } catch (err) {
    console.warn(err.code, err.message)
    Alert.alert(err.message)
  }
}

const {
  // addRestoreTransactionsListener,
  addPurchaserInfoUpdateListener,
  addPurchaseListener,
} = Purchases

export const setInfoListener = (callback) => {
  const handler = (purchaserInfo) => {
    callback(undefined, purchaserInfo, eventTypes.INFO)
  }
  addPurchaserInfoUpdateListener(handler)

  return () => Purchases.removePurchaserInfoUpdateListener(handler)
}

export const setPurchaseListener = (callback) => {
  const handler = (productIdentifier, purchaserInfo, error) => {
    callback(error, purchaserInfo, eventTypes.PURCHASE)
  }

  addPurchaseListener(handler)

  return () => Purchases.removePurchaseListener(handler)
}
