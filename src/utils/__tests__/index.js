import { indexToString } from '../';

describe('#indexToString', () => {
	it('should convert to string the second argument', () => {
		expect(indexToString(undefined, 'test')).toBe('test');
		expect(indexToString(undefined, 123)).toBe('123');
	});
});
