const {Parameter} = require('./parameter');


/**
 * Create a SVG Parameter fill.
 *
 * @class
 * @property {Boolean} error - The error status.
 * @property {String} message - The error message.
 * @property {String} parameterName - The parameter name: `fill`.
 * @property {String} value - The parameter value, it can be a color, none,
 * context-fill, context-stroke or url.
 *
 * @returns {Parameter} The SVG Parameter fill.
 */
class Fill extends Parameter {
	/**
	 * This function creates a new SVG Parameter fill object.
	 *
	 * @param {Paint} paint - The `Paint` to be used.
	 *
	 * @override
	 * @see Parameter#constructor
	 */
	constructor(paint) {
		// Call the parent constructor
		super();

		// Set the parameter name
		this.parameterName = 'fill';

		// If there is an error, return
		if (this.error) {
			this.error = true;
			this.message = 'Invalid fill';
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
};


// Export SVG Parameters class
module.exports = {Fill};
