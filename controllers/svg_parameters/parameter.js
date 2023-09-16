const {STRING_REGEX} = require('../constants.js');


/**
 * This class represents a SVG Parameter.
 * It is used to build a SVG Parameter string.
 *
 * @class
 * @property {Boolean} error - The error status.
 * @property {String} message - The error message.
 * @property {String} parameterName - The parameter name.
 * @property {Any} value - The parameter value, will change the type for every
 * class.
 *
 * @returns {Parameter} The SVG parameter.
 */
class Parameter {
	/**
	* This function creates a new SVG Parameter object.
	*/
	constructor() {
		this.error = false;
		this.message = 'OK';
		this.parameterName = 'Parameter';
		this.value = '';
	}

	/**
	 * Get the error status.
	 *
	 * @returns {Boolean} The error status.
	 */
	getError() {
		return {error: this.error, message: this.message};
	}

	/**
	 * Get the parameter name.
	 *
	 * @returns {String} This parameter name.
	 */
	getParameterName() {
		return this.parameterName;
	}

	/**
	 * Set the parameter value.
	 *
	 * @param {String} value - The parameter value.
	 *
	 * @returns {Boolean} If the value is valid.
	 */
	setParameterValue(value) {
		if (
			typeof value !== 'string' || value === '' ||
			!STRING_REGEX.test(value)
		) {
			this.error = true;
			this.message = 'Invalid value';
			return false;
		}

		this.value = value;
		return true;
	}

	/**
	 * Build this parameter, returning a string.
	 *
	 * @returns {String} The SVG Parameter string.
	 */
	build() {
		// Return if there is an error, or if the value is not a string
		// or the string is invalid
		if (
			this.error || !this.value || !STRING_REGEX.test(this.value)
		) return '';

		return '';
	}
};


// Export SVG Parameters class
module.exports = {Parameter};
