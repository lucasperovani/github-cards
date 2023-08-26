// Librairies
const axios = require('axios');

// This Module
const {BasicSVG} = require('./svg_elements/svg.js');
const {SVGTitle} = require('./svg_elements/title.js');

// Constants
const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const DISPLAY_WIDTH = 400;
const DISPLAY_HEIGHT = 200;

const controller = {};


/**
 * This function gets the user's information from Github and sends back the
 * response.
 *
 * @async
 * @private
 * @static
 * @function
 *
 * @param {String} username - The request object.
 *
 * @returns {Promise<Object>} The user's information or error as following:
 * - success   - Boolean value if there is an error;
 * - userInfo: - User's information object;
 * - userRepos - User's repos object.
 */
async function getUserInfo(username) {
	// Validate the username
	if (!username || !USERNAME_REGEX.test(username)) return {success: false};

	// Get the user from Github
	const userInfoPromise = axios.get(
		'http://api.github.com/users/' + username,
	);

	// Get the user's repos from Github
	const userReposPromise = axios.get(
		'http://api.github.com/users/' + username + '/repos',
	);

	// Await the promises
	const [userInfo, userRepos] = await Promise.all([
		userInfoPromise, userReposPromise,
	]);

	// If there is an error, return
	if (
		!userInfo || !userInfo.data || userInfo.status !== 200 ||
		!userRepos || !userRepos.data || userRepos.status !== 200
	) return {success: false};


	// Return the user's information
	return {
		success:   true,
		userInfo:  userInfo.data,
		userRepos: userRepos.data,
	};
};


/**
 * Build the SVG Github Card.
 *
 * @private
 * @static
 * @function
 *
 * @param {String} avatar - The user's avatar.
 * @param {String} name - The user's name.
 * @param {String} login - The user's login.
 * @param {String} bio - The user's bio.
 * @param {Integer} stars - The user's stars.
 * @param {Integer} width - The SVG width.
 * @param {Integer} height - The SVG height.
 * @param {String} title - The SVG title.
 * @param {String} description - The SVG description.
 */


/**
 * This function is the entry point for the Github Cards API calls. It prepares
 * the calls to the Github API to get the user's information and is the entry
 * point for building the whole SVG.
 * This entry point requires the username of the Github user account passed in
 * the URL.
 * It sends back an SVG image with the user's information in a card format.
 *
 * @async
 *
 * @param {Express.Request} request - The request object.
 * @param {Express.Response} response - The response object.
 *
 * @returns {void}
 */
controller.entry = async function(request, response) {
	// Validate the response
	if (!response) return;

	// Validate the request
	if (!request || !request.params || !request.params.user) {
		return response.status(400).send('Bad Request');
	}

	// Get the response from Github
	const gitResponse = await getUserInfo(request.params.user);

	// If there is an error, return
	if (!gitResponse.success) return response.status(502).send('Bad Gateway');

	// Get the user's information
	const userInfo = gitResponse.userInfo;
	const userRepos = gitResponse.userRepos;

	// Get the user's information
	const avatar = userInfo.avatar_url;
	const name = userInfo.name;
	const login = userInfo.login;
	const bio = userInfo.bio;

	// Get the user's repos stars
	const stars = userRepos.reduce((accumulator, repo) => {
		return accumulator + parseInt(repo.stargazers_count);
	}, 0);

	// Change the content type to SVG
	response.setHeader('content-type', 'image/svg+xml; charset=utf-8');

	// Create a new SVG
	const svg = new BasicSVG(DISPLAY_WIDTH, DISPLAY_HEIGHT);

	// Set svg parameters
	svg.addParameter('fill', 'none'); // Set the fill color to none
	svg.addParameter('role', 'img'); // Set the role to img
	svg.addParameter('aria-labelledby', 'descriptionID'); // Set the description

	// Create the title
	const title = new SVGTitle(
		name + ' (@' + login + ') - Github Card',
	);

	// Add the title to the SVG
	svg.addChild(title);

	// Send the SVG
	response.send(svg.build());
};

module.exports = controller;
