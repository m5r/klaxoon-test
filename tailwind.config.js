module.exports = {
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [
		require("@tailwindcss/forms"),
	],
	purge: [
		"./src/**/*.html",
		"./src/**/*.js",
		"./src/**/*.jsx",
		"./src/**/*.ts",
		"./src/**/*.tsx",
		"./public/index.html",
	],
};
