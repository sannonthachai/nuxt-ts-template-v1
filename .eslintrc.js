module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'prettier',
		'prettier/vue',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended'
	],
	plugins: ['prettier'],
	// add your custom rules here
	rules: {
		'nuxt/no-cjs-in-config': 'off',
		'no-console': [
			'warn',
			{
				allow: ['warn', 'error']
			}
		],
		'max-lines': [
			'warn',
			{
				max: 300,
				skipBlankLines: true,
				skipComments: true
			}
		],
		semi: ['error', 'never'],
		camelcase: 'off',
		'comma-dangle': ['error', 'never'],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-shadow': ['error', { allow: ['state'] }],
		'no-param-reassign': ['error', { props: false }],
		'linebreak-style': 0,
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				semi: false,
				trailingComma: 'none',
				printWidth: 120,
				tabWidth: 4
			}
		],
		'arrow-parens': 0
	}
}
