import Purchases from 'react-native-purchases'
import { REVENUECAT_API_KEY } from 'react-native-dotenv'
import { Alert } from 'react-native'
import { getUser } from './session'

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

export const buySubscription = async (productId) => {
  try {
    Purchases.makePurchase(productId)
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
