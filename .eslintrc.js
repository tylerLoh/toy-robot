module.exports = {
	env: {
		browser: true,
		es6: true,
    amd: true,
    node: true,
    jest: true
	},
	extends: ["eslint:recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module"
  },
	rules: {
		"max-len": ["error", { code: 80 }]
	}
};
