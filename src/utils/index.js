export const indexToString = (item, index) => index.toString()

export const capitalize = (text = '') => text.charAt(0).toUpperCase() + text.substr(1)

export const extractSetupParams = (navigation) => ({
  birthDate: navigation.getParam('birthDate'),
  country: navigation.getParam('country'),
  state: navigation.getParam('state'),
  countryName: navigation.getParam('countryName'),
  stateName: navigation.getParam('stateName'),
  name: navigation.getParam('name'),
  gender: navigation.getParam('gender', ''),
  birthPlace: navigation.getParam('birthPlace'),
  platform: navigation.getParam('platform'),
})
