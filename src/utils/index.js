export const indexToString = (item, index) => index.toString();

export const capitalize = (text = '') =>
	text.charAt(0).toUpperCase() + text.substr(1);

export const extractSetupParams = (route) => {
	if (!route || !route.params) {
		return {
			gender: '',
			updateSetup: false,
		};
	}
	return {
		birthDate: route.params.birthDate,
		country: route.params.country,
		state: route.params.state,
		countryName: route.params.countryName,
		stateName: route.params.stateName,
		givenName: route.params.givenName,
		gender: route.params.gender || '',
		birthPlace: route.params.birthPlace,
		platform: route.params.platform,
		notifications: route.params.notifications,
		updateSetup: route.params.updateSetup || false,
	};
};
