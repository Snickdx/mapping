module.exports = {
	globDirectory: 'public/',
	clientsClaim: true,
	globPatterns: [
		'**/*.{html,js,ico,png,json}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};