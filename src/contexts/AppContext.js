import React from 'react';
import PropTypes from 'prop-types';
import { AdMobInterstitial } from 'react-native-admob';

const Context = React.createContext({});

const AppProvider = (props) => {
	const interstitialRef = React.useRef();
	const { children, bannerId, interstitialId } = props;

	const showAd = React.useCallback(async () => {
		if (!interstitialRef.current) {
			return;
		}

		try {
			await interstitialRef.current;
			AdMobInterstitial.showAd();
			await new Promise((resolve) => {
				AdMobInterstitial.addEventListener('adClosed', () => {
					resolve();
				});
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	const value = {
		bannerId,
		interstitialId,
		showAd,
	};

	React.useEffect(() => {
		AdMobInterstitial.setAdUnitID(interstitialId);
		if (process.env.NODE_ENV === 'development') {
			AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
		}

		interstitialRef.current = AdMobInterstitial.requestAd();

		interstitialRef.current.then(() => {
			console.log('add area loaded');
		});
	}, [interstitialId]);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

AppProvider.propTypes = {
	bannerId: PropTypes.string.isRequired,
	interstitialId: PropTypes.string.isRequired,
};

const useAppContext = () => React.useContext(Context);

export { useAppContext };

export default {
	Provider: AppProvider,
};
