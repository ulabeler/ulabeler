module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true,
	},
	'extends': [
		'plugin:react/recommended',
		'google',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	'plugins': [
		'react',
		'@typescript-eslint',
	],
	'rules': {
		'require-jsdoc': 'off',
		'no-tabs': 'off',
		'max-len': 'off',
		'indent': [
			'error',
			'tab',
		],
		'no-unused-vars': 'warn',
		'new-cap': [
			'error',
			{
				'capIsNewExceptions': [
					'Router',
					'Controller',
					'Get',
					'Post',
					'Put',
					'Delete',
					'Res',
					'Req',
				],
			},
		],
	},
};
