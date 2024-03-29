const {SVG} = require('./svg.js');
const {STRING_REGEX} = require('../constants.js');


/**
 * Create a SVG title.
 *
 * @param {String} title - The title.
 *
 * @returns {SVG} The SVG title.
 */
class SVGTitle extends SVG {
	/**
	 * This function creates a new SVGTitle object.
	 *
	 * @param {String} title - The title.
	 *
	 * @override
	 * @see SVG#constructor
	 */
	constructor(title = '') {
		// Call the parent constructor
		super();

		// If there is an error, return
		if (this.error) {
			this.error = true;
			this.message = 'Invalid title';
			this.title = '';

			return;
		}

		// If the title is not a string, return
		if (
			typeof title !== 'string' ||
			!STRING_REGEX.test(title)
		) {
			this.error = true;
			this.message = 'Invalid title';
			this.title = '';

			return;
		}

		// Set the title
		this.title = title;
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
		return '<title ' + this.buildParameters() + '>' +
					this.title +
				'</title>';
	}
};


// Export SVGs class
module.exports = {SVGTitle};
