import { ONESIGNAL_APPID } from 'react-native-dotenv'
import OneSignal from 'react-native-onesignal'
import debugFactory from 'debug'
import { updateUserAttribute, getUser, sanitizeUser } from './session'

const debugInfo = debugFactory('yester:notifications:info')
const debugError = debugFactory('yester:notifications:error')

export const initNotifications = () => {
  try {
    OneSignal.init(ONESIGNAL_APPID, { kOSSettingsKeyAutoPrompt: false })
    OneSignal.setLogLevel(0, 0)
  } catch (error) {
    debugError('initNotifications', error)
  }
}

export const addEventListener = (eventName, callback) => {
  try {
    OneSignal.addEventListener(eventName, callback)
  } catch (error) {
    debugError('addEventListener', error)
  }
}

export const removeEventListener = (eventName, callback) => {
  try {
    OneSignal.removeEventListener(eventName, callback)
  } catch (error) {
    debugError('removeEventListener', error)
  }
}

export const configureNotifications = (eventName, callback) => {
  try {
    OneSignal.configure()
  } catch (error) {
    debugError('configureNotifications', error)
  }
}

export const sendTags = (tagsObject) => {
  try {
    OneSignal.sendTags(tagsObject)
  } catch (error) {
    debugError('sendTags', error)
  }
}

export const requestPermissions = () => {
  try {
    const permissions = {
      alert: true,
      badge: true,
      sound: true,
    }
    OneSignal.requestPermissions(permissions)
  } catch (error) {
    debugError('requestPermissions', error)
  }
}

export const checkPermissions = () => {
  try {
    OneSignal.checkPermissions((permissions) => {
      debugInfo(permissions)
    })
  } catch (error) {
    debugError('checkPermissions', error)
  }
}

export const getPermissionSubscriptionState = (callback) => {
  try {
    OneSignal.getPermissionSubscriptionState(callback)
  } catch (error) {
    debugError('getPermissionSubscriptionState', error)
  }
}

export const setSubscription = (enable) => {
  try {
    OneSignal.setSubscription(enable)
  } catch (error) {
    debugError('setSubscription', error)
  }
}

export const registerForPushNotifications = async () => {
  try {
    await OneSignal.registerForPushNotifications()
  } catch (error) {
    debugError('registerForPushNotifications', error)
  }
}

export const checkNotificationsStatus = async () => {
  try {
    const user = sanitizeUser(await getUser())
    const { userId, email } = user

    await registerForPushNotifications()

    if (userId) OneSignal.setExternalUserId(userId)
    if (email) OneSignal.setEmail(email)
    configureNotifications()

    getPermissionSubscriptionState(async (status) => {
      debugInfo('checkNotificationsStatus: ', status)
      await updateUserAttribute('custom:notifications', status.subscriptionEnabled.toString())
    })
  } catch (error) {
    debugError('checkNotificationsStatus', error)
  }
}
