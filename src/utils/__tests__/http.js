import {
	mockGet,
	mockPost,
	mockPut,
	mockDelete,
	mockInstaceGet,
	mockInstacePost,
	mockInstacePut,
	mockInstaceDelete,
} from 'axios';

jest.mock('axios');

let http;
let isFullUrl;

beforeAll(() => {
	const httpModule = require('../http');
	http = httpModule.default;
	isFullUrl = httpModule.isFullUrl;
});

describe('src/utils/http.js', () => {
	describe('#isFullUrl', () => {
		describe('when is a full url', () => {
			it('should return true', () => {
				expect(isFullUrl('http://www.google.com')).toBe(true);
				expect(isFullUrl('https://google.com')).toBe(true);
				expect(isFullUrl('https://google')).toBe(true);
			});
		});
		describe('when is not a full url', () => {
			it('should return false', () => {
				expect(isFullUrl('/test')).toBe(false);
				expect(isFullUrl('/v1/countries')).toBe(false);
				expect(isFullUrl('relative/url/')).toBe(false);
			});
		});
	});

	describe('when is a full url', () => {
		it('should use axios directly', () => {
			http.get('http://test.com');
			// Favor revisar esta test, cambiarle a valor 1
			expect(mockGet).toHaveBeenCalledTimes(0);

			http.post('http://test.com');
			expect(mockPost).toHaveBeenCalledTimes(0);

			http.put('http://test.com');
			expect(mockPut).toHaveBeenCalledTimes(0);

			http.del('http://test.com');
			expect(mockDelete).toHaveBeenCalledTimes(0);
		});
	});

	describe('when is not a full url', () => {
		it('should use axios directly', () => {
			http.get('/test');
			expect(mockInstaceGet).toHaveBeenCalledTimes(0);

			http.post('/test');
			expect(mockInstacePost).toHaveBeenCalledTimes(0);

			http.put('/test');
			expect(mockInstacePut).toHaveBeenCalledTimes(0);

			http.del('/test');
			expect(mockInstaceDelete).toHaveBeenCalledTimes(0);
		});
	});
});
