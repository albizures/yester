import axios from 'axios';
import { HOST } from 'react-native-dotenv';
import { signRequest } from './session';
import { API } from 'aws-amplify';
import debugFactory from 'debug';

const debugInfo = debugFactory('yester:http:info');
const debugError = debugFactory('yester:http:error');

export const instance = axios.create({
	baseURL: HOST,
});

export const original = axios;
export const headers = {};

export const isFullUrl = (url) => url.startsWith('http');

const getInstance = (url) => (isFullUrl(url) ? axios : instance);

export default {
	get: (url, params) => getInstance(url).get(url, { params }),
	del: (url) => getInstance(url).delete(url),
	post: (url, body) => getInstance(url).post(url, body),
	put: (url, body) => getInstance(url).put(url, body),
	getAPI: async (path, params) => {
		const myInit = {
			headers,
			response: true,
			queryStringParameters: params,
		};
		const response = await API.get('MainAPI', path, myInit);
		debugInfo(
			'http.getAPI ' + path + ' params: ' + JSON.stringify(params || {}),
			response,
		);
		return response;
	},
	postAPI: async (path, body) => {
		const myInit = {
			headers,
			response: true,
			body: body,
		};
		const response = await API.post('MainAPI', path, myInit);
		debugInfo('http.postAPI ' + path, body);
		return response;
	},
	putAPI: async (path, body) => {
		const myInit = {
			headers,
			response: true,
			body: body,
		};
		const response = await API.put('MainAPI', path, myInit);
		debugInfo('http.putAPI ' + path, body);
		return response;
	},
};

export const setHeaderLocale = (locale) => {
	instance.defaults.headers.common['X-Yester-Language'] = locale;
	original.defaults.headers.common['X-Yester-Language'] = locale;
	headers['x-yester-language'] = locale;
};

export const getSignedRequest = async (url) => {
	const host = HOST.split('/')[2];

	const request = {
		service: 'execute-api',
		host: host,
		method: 'GET',
		url: HOST + url,
		path: '/dev/' + url,
	};

	try {
		const signedRequest = await signRequest(request);
		const response = await axios(signedRequest);
		debugInfo('response: ', response);
	} catch (e) {
		debugError(e.response);
		debugError(e);
	}
};

export const postSignedRequest = async (url, userAttributes) => {
	const host = HOST.split('/')[2];

	const request = {
		service: 'execute-api',
		host: host,
		method: 'POST',
		url: HOST + url,
		path: '/dev/' + url,
		data: JSON.stringify(userAttributes),
		body: JSON.stringify(userAttributes),
	};

	try {
		const signedRequest = await signRequest(request);
		const response = await axios(signedRequest);
		debugInfo('response: ', response);
	} catch (e) {
		debugError(e.response);
		debugError(e);
	}
};
