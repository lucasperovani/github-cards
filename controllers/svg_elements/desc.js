const {SVG} = require('./svg.js');
const {STRING_REGEX} = require('../constants.js');


/**
 * Create a SVG desc.
 *
 * @param {String} description - The description.
 *
 * @returns {SVG} The SVG desc.
 */
class SVGDesc extends SVG {
	/**
	 * This function creates a new SVGDesc object.
	 *
	 * @param {String} description - The description.
	 *
	 * @override
	 * @see SVG#constructor
	 */
	constructor(description = '') {
		// Call the parent constructor
		super();

		// If there is an error, return
		if (this.error) {
			this.error = true;
			this.message = 'Invalid description';
			this.description = '';

			return;
		}

		// If the description is not a string, return
		if (
			typeof description !== 'string' ||
			!STRING_REGEX.test(description)
		) {
			this.error = true;
			this.message = 'Invalid description';
			this.description = '';

			return;
		}

		// Set the description
		this.description = description;
	}

	/**
	 * This function returns the SVG string. This element has no children.
	 *
	 * @returns {String} The SVG string.
	 *
	 * @override
	 * @see SVG#build
	 */
	build() {
		// Return the SVG string
		return '<desc ' + this.buildParameters() + '>' +
					this.description +
				'</desc>';
	}
};


// Export SVGs class
module.exports = {SVGDesc};
