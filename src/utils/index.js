export const indexToString = (item, index) => index.toString();

export const capitalize = (text = '') =>
	text.charAt(0).toUpperCase() + text.substr(1);

export const extractSetupParams = (navigation) => ({
	birthDate: navigation.getParam('birthDate'),
	country: navigation.getParam('country'),
	state: navigation.getParam('state'),
	countryName: navigation.getParam('countryName'),
	stateName: navigation.getParam('stateName'),
	givenName: navigation.getParam('givenName'),
	gender: navigation.getParam('gender', ''),
	birthPlace: navigation.getParam('birthPlace'),
	platform: navigation.getParam('platform'),
	notifications: navigation.getParam('notifications'),
	updateSetup: navigation.getParam('updateSetup') || false,
});
