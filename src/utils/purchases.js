import Purchases from 'react-native-purchases'
import { REVENUECAT_API_KEY } from 'react-native-dotenv'
import { Alert } from 'react-native'
import debugFactory from 'debug'
import { saveUserSubscriptionStatus, subscriptionStatus } from './session'
import _ from 'lodash'

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
    return purchaserInfo
  } catch (err) {
    debugError('Make purchase', err.code, err.message)
    debugError(JSON.stringify(err))
    throw err
  }
}

export const restoreTransactions = async () => {
  try {
    const purchaserInfo = await Purchases.restoreTransactions()
    return purchaserInfo
  } catch (err) {
    debugError('Restore transactions', err.code, err.message)
    debugError(JSON.stringify(err))
    throw err
  }
}

export const resetPurchases = () => {
  try {
    Purchases.reset()
  } catch (err) {
    debugError('Reseting: ', err)
    throw err
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
