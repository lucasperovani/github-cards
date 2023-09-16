const {Parameter} = require('./parameter');
const {STRING_REGEX} = require('../constants.js');


/**
 * Create a SVG Parameter aria-labedby.
 *
 * @class
 * @property {Boolean} error - The error status.
 * @property {String} message - The error message.
 * @property {String} parameterName - The parameter name: `aria-labedby`.
 * @property {String} value - The parameter ID that references the element.
 *
 * @returns {Parameter} The SVG Parameter aria-labedby.
 */
class AriaLabedBy extends Parameter {
	/**
	 * This function creates a new SVG Parameter aria-labedby object.
	 *
	 * @param {String} id - The ID string of the reference to use.
	 *
	 * @override
	 * @see Parameter#constructor
	 */
	constructor(id = '') {
		// Call the parent constructor
		super();

		// Set the parameter name
		this.parameterName = 'aria-labedby';

		// If there is an error, return
		if (this.error) {
			this.error = true;
			this.message = 'Invalid aria-labedby';
			this.value = '';

			return;
		}

		// If the id is not a string, return
		if (typeof id !== 'string' || id === '' || !STRING_REGEX.test(id)) {
			this.error = true;
			this.message = 'Invalid ID';
			this.value = '';

			return;
		}

		// Set the id
		this.value = id;
	}

	/**
	 * Set the parameter ID.
	 *
	 * @param {String} id - The ID of the aria-labedby.
	 *
	 * @returns {Boolean} If the value is valid.
	 *
	 * @override
	 * @see Parameter#setParameterValue
	 */
	setParameterValue(id) {
		if (typeof id !== 'string' || id === '' || !STRING_REGEX.test(id)) {
			this.error = true;
			this.message = 'Invalid ID';
			return false;
		}

		this.value = id;
		return true;
	}

	/**
	 * Build this parameter, returning a string.
	 *
	 * @returns {String} The SVG Parameter string.
	 *
	 * @override
	 * @see Parameter#build
	 */
	build() {
		// Return if there is an error, or if the value is not a string
		// or the string is invalid
		if (
			this.error || !this.value || !STRING_REGEX.test(this.value)
		) return '';

		return this.parameterName + '="' + this.value + '"';
	}
};


// Export SVG Parameters class
module.exports = {AriaLabedBy};
