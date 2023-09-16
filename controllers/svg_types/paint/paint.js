/**
 * Creates a SVG type Paint.
 *
 * @class
 * @property {Boolean} error - The error status.
 * @property {String} message - The error message.
 * @property {String} value - The parameter value.
 *
 * @returns {Paint} The SVG type Paint.
 */
class Paint {
	/**
	 * This function creates a new SVG type Paint object.
	 */
	constructor() {
		this.error = false;
		this.message = 'OK';
		this.value = '';
	}

	/**
	 * This function returns the SVG type Paint.
	 *
	 * @returns {String} The SVG type Paint.
	 */
	build() {
		if (this.error) return '';

		return '';
	}
};


// Export SVG Parameters class
module.exports = {Paint};
