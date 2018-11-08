import Purchases from 'react-native-purchases'
import { REVENUECAT_API_KEY } from 'react-native-dotenv'
import RNIap from 'react-native-iap'
import { Alert, Platform } from 'react-native'
import { getUser } from './session'

export const setupRCPurchases = async () => {
  try {
    const user = await getUser()
    Purchases.setup(REVENUECAT_API_KEY, user.attributes.email)
  } catch (error) {
    console.log('setupRCPurchases', error)
  }
}

export const getRCEntitlement = async () => {
  try {
    const { pro } = await Purchases.getEntitlements()
    console.log('entitlement', pro)
    return pro
  } catch (error) {
    console.log('getRCEntitlements', error)
  }
  // later make a purchase
  // Purchases.makePurchase(entitlements.pro.monthly.identifier)
}

export const initConnection = async () => {
  try {
    const result = await RNIap.initConnection()
    console.log('result', result)
    return result
  } catch (error) {
    console.warn(error.code, error.message)
  }
}

export const getSubscriptions = async () => {
  try {
    await initConnection()
    const { monthly, yearly } = await getRCEntitlement()
    const itemSubs = Platform.select({
      ios: [
        monthly.identifier,
        yearly.identifier,
      ],
      android: [
        monthly.identifier,
        yearly.identifier,
      ],
    })
    const subscriptions = await RNIap.getSubscriptions(itemSubs)
    return subscriptions
  } catch (error) {
    console.warn(error)
  }
}

export const buySubscription = async (productId) => {
  try {
    console.log('buySubscribeItem: ' + productId)
    const purchase = await RNIap.buySubscription(productId)
    console.info(purchase)
    return purchase
  } catch (err) {
    console.warn(err.code, err.message)
    Alert.alert(err.message)
  }
}

export const getPurchaseHistory = async () => {
  try {
    const purchaseHistory = await RNIap.getPurchaseHistory()
    return purchaseHistory
  } catch (err) {
    console.warn(err.code, err.message)
    Alert.alert(err.message)
  }
}

this.receivePurchaserInfo = (purchaserInfo) => {
  console.log('purchaserInfo', purchaserInfo)
}

const purchaserInfoHandler = (purchaserInfo, error) => {
  if (purchaserInfo) {
    this.receivePurchaserInfo(purchaserInfo)
  }
}

Purchases.addPurchaseListener((productIdentifier, purchaserInfo, error) => {
  if (error && !error.userCancelled) {
    this.setState({error: error.message})
    return
  }
  purchaserInfoHandler(purchaserInfo)
})

Purchases.addPurchaserInfoUpdateListener((purchaserInfo, error) => {
  if (purchaserInfo) {
    purchaserInfoHandler(purchaserInfo)
  }
})

Purchases.addRestoreTransactionsListener((purchaserInfo, error) => {
  if (purchaserInfo) {
    purchaserInfoHandler(purchaserInfo)
  }
})
