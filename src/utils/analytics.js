import { SEGMENT_KEY } from 'react-native-dotenv'
import analytics from '@segment/analytics-react-native'
import debugFactory from 'debug'

const debugError = debugFactory('yester:analytics:error')

export const setupAnalytics = async () => {
  try {
    await analytics.setup(SEGMENT_KEY, {
      flushAt: 1,
      debug: false,
      // Record screen views automatically!
      recordScreenViews: false,
      // Record certain application events automatically!
      trackAppLifecycleEvents: true,
    })
  } catch (error) {
    debugError('setupAnalytics', error)
  }
}

export const identifyAnalytics = async (user) => {
  try {
    const { userId, email } = user
    analytics.identify(userId, {
      email: email,
    })
  } catch (error) {
    debugError('identify', error)
  }
}

export const track = async (event, properties) => {
  try {
    analytics.track(event, properties)
  } catch (error) {
    debugError('track', error)
  }
}

export const screen = async (name, properties) => {
  try {
    analytics.screen(name, properties)
  } catch (error) {
    debugError('screen', error)
  }
}

export const resetAnalytics = () => {
  try {
    analytics.reset()
  } catch (error) {
    debugError('reset', error)
  }
}
