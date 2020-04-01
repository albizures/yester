module.exports = {
	root: true,
	extends: ['@react-native-community'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error',
		'jsx-quotes': ['off', 'prefer-single'],
	},
	globals: {
		__DEV__: true,
	},
	env: {
		jest: true,
	},
};
