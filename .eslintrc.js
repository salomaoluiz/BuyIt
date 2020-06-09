module.exports = {
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	globals: {
		window: true,
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'typescript', '@typescript-eslint'],
	rules: {
		// disable the rule for all files
		'@typescript-eslint/explicit-function-return-type': 'off',
		'no-console': 'warn',
		'object-curly-spacing': ['error', 'always'],
		semi: 'warn',
		'react/display-name': 'off',
	},
};
