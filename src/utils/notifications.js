import { ONESIGNAL_APPID } from 'react-native-dotenv'
import OneSignal from 'react-native-onesignal'
import debugFactory from 'debug'
import { updateUserAttribute } from './session'

const debugInfo = debugFactory('yester:notifications:info')
const debugError = debugFactory('yester:notifications:error')

export const initNotifications = () => {
  try {
    OneSignal.init(ONESIGNAL_APPID, { kOSSettingsKeyAutoPrompt: false })
    OneSignal.setLogLevel(0, 0)
  } catch (err) {
    debugError('initNotifications', err)
  }
}

export const addEventListener = (eventName, callback) => {
  try {
    OneSignal.addEventListener(eventName, callback)
  } catch (err) {
    debugError('addEventListener', err)
  }
}

export const removeEventListener = (eventName, callback) => {
  try {
    OneSignal.removeEventListener(eventName, callback)
  } catch (err) {
    debugError('removeEventListener', err)
  }
}

export const sendTags = (tagsObject) => {
  try {
    OneSignal.sendTags(tagsObject)
  } catch (err) {
    debugError('sendTags', err)
  }
}

export const sendUserNotificationsTags = (user) => {
  const { givenName: name, country, gender } = user
  sendTags({ name, country, gender })
}

export const requestPermissions = () => {
  try {
    const permissions = {
      alert: true,
      badge: true,
      sound: true,
    }
    OneSignal.requestPermissions(permissions)
  } catch (err) {
    debugError('requestPermissions', err)
  }
}

export const checkPermissions = () => {
  try {
    OneSignal.checkPermissions((permissions) => {
      debugInfo(permissions)
    })
  } catch (err) {
    debugError('checkPermissions', err)
  }
}

export const getPermissionSubscriptionState = (callback) => {
  try {
    // Asyncronous
    OneSignal.getPermissionSubscriptionState(callback)
  } catch (err) {
    debugError(err)
  }
}

// TODO work on this, to be the only source of truth
/*
export const getNotificationsStatus = async (user) => {
  const { notifications } = user
  try {
    await OneSignal.getPermissionSubscriptionState((status) => {
      Object.assign(status, { userNotifications: notifications })
      return status
    })
  } catch (err) {
    debugError(err)
  }
}
*/

export const setSubscription = (enable) => {
  try {
    OneSignal.setSubscription(enable)
  } catch (err) {
    debugError('setSubscription', err)
  }
}

export const registerForPushNotifications = async () => {
  try {
    await OneSignal.registerForPushNotifications()
  } catch (err) {
    debugError('registerForPushNotifications', err)
  }
}

export const setNotificationsStatus = async (user) => {
  const { userId, email } = user
  try {
    await registerForPushNotifications()
    if (userId) OneSignal.setExternalUserId(userId)
    if (email) OneSignal.setEmail(email)

    getPermissionSubscriptionState(async (notifStatus) => {
      debugInfo('setNotificationsStatus: ', notifStatus)
      await updateUserAttribute('notifications', notifStatus.subscriptionEnabled)
    })
  } catch (err) {
    debugError('setNotificationsStatus', err)
  }
}
