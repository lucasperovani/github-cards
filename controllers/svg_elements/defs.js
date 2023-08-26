const {SVG} = require('./svg.js');


/**
 * Create a SVG defs.
 *
 * @returns {SVG} The SVG defs.
 */
class SVGDefs extends SVG {
	/**
	 * This function creates a new SVGDefs object.
	 *
	 * @override
	 * @see SVG#constructor
	 */
	constructor() {
		// Call the parent constructor
		super();

		// If there is an error, return
		if (this.error) {
			this.error = true;
			this.message = 'Invalid description';

			return;
		}
	}

	/**
	 * This function returns the SVG string.
	 *
	 * @returns {String} The SVG string.
	 *
	 * @override
	 * @see SVG#build
	 */
	build() {
		// Return the SVG string
		return '<defs ' + this.buildParameters() + '>' +
					this.buildChildren() +
				'</defs>';
	}
};


// Export SVGs class
module.exports = {SVGDefs};
