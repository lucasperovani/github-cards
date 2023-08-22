// Librairies
const axios = require('axios');

// This Module
const {BasicSVG} = require('./classes/svg.js');

// Constants
const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const DISPLAY_WIDTH = 400;
const DISPLAY_HEIGHT = 200;



let controller = {};


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
 * @return {void}
 */
controller.entry = async function (request, response) {
	// Validate the response
	if (!response) return;

	// Validate the request
	if (!request || !request.params || !request.params.user) {
		return response.status(400).send('Bad Request');
	}

	// Validate the user to only contain valid characters
	if (!USERNAME_REGEX.test(request.params.user)) {
		return response.status(400).send('Invalid Username');
	}

	// Get the user from Github
	const userInfoPromise = axios.get(
		'http://api.github.com/users/' + request.params.user,
	);

	// Get the user's repos from Github
	const userReposPromise = axios.get(
		'http://api.github.com/users/' + request.params.user + '/repos',
	);

	// Get the response from Github
	const [userInfo, userRepos] = await Promise.all([
		userInfoPromise, userReposPromise,
	]);

	// Check if all infos exists and is valid
	if (
		!userInfo || !userInfo.data || userInfo.status !== 200 ||
		!userRepos || !userRepos.data || userRepos.status !== 200
	) return response.status(404).send('User Not Found');

	// Get the user's information
	const avatar = userInfo.data.avatar_url;
	const name = userInfo.data.name;
	const login = userInfo.data.login;
	const bio = userInfo.data.bio;

	// Get the user's repos stars
	const stars = userRepos.data.reduce((accumulator, repo) => {
		return accumulator + parseInt(repo.stargazers_count);
	}, 0);

	// Change the content type to SVG
	response.setHeader('content-type', 'image/svg+xml; charset=utf-8');

	// Build the SVG
	let svg = new BasicSVG(
		DISPLAY_WIDTH, DISPLAY_HEIGHT,
	);

	// Send the SVG
	response.send(svg.build());
};

module.exports = controller;