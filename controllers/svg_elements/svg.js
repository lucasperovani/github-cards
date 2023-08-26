const ALLOWED_PARAMETERS = {
	'aria-labelledby': {type: 'string'},
	'fill':            {type: 'string'},
	'height':          {type: 'integer', min: 1},
	'id':              {type: 'string'},
	'role':            {
		type:   'string',
		values: ['application', 'document', 'img'],
	},
	'viewBox': {type: 'integer-array', length: 4},
	'width':   {type: 'integer', min: 1},
};
const STRING_REGEX = /^[a-zA-Z0-9-_]+$/;


/**
 * This class represents an SVG.
 * It is used to build an SVG string.
 *
 * @class
 * @property {Boolean} error - The error status.
 * @property {String} message - The error message.
 * @property {SVG[]} children - The SVG children.
 */
class SVG {
	/**
	* This function creates a new SVG object.
	*
	* @param {SVG[]} children - The SVG children.
	*/
	constructor(children = []) {
		// If it is not an array, give an error
		if (!Array.isArray(children)) {
			this.error = true;
			this.message = 'Invalid children array';
			this.children = [];
			this.parameters = {};

			return;
		}

		// Check if all children are SVGs
		const areSVG = children.every((child) => (child instanceof SVG));

		// If not, give an error
		if (!areSVG) {
			this.error = true;
			this.message = 'Invalid children';
			this.children = [];
			this.parameters = {};

			return;
		}

		this.error = false;
		this.message = 'OK';
		this.children = children;
		this.parameters = {};
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
	 * Push a child to the SVG.
	 *
	 * @param {SVG} child - The child to push.
	 *
	 * @returns {Boolean} The push status.
	 */
	addChild(child) {
		// If there is an error, return false
		if (this.error) return false;

		// If the child is not an SVG, return false
		if (!(child instanceof SVG)) return false;

		// Push the child
		this.children.push(child);

		// Return true
		return true;
	}

	/**
	 * This function build the children SVG string.
	 *
	 * @returns {String} The children SVG string.
	 */
	buildChildren() {
		// If there is an error, return an empty string
		if (this.error) return '';

		// Loop through the children and build the SVG string
		let svg = '';
		this.children.forEach((child) => svg += child.build());

		// Return the SVG string
		return svg;
	}

	/**
	 * Add a parameter to the SVG tag.
	 *
	 * @param {String} name - The parameter name.
	 * @param {String} value - The parameter value.
	 *
	 * @returns {Boolean} If could add the parameter.
	 */
	addParameter(name, value) {
		// If there is an error, return false
		if (this.error) return false;

		// If the name is not a string, return false
		if (typeof name !== 'string') return false;

		// If the parameter is not allowed, return false
		switch (ALLOWED_PARAMETERS[name].type) {
			// String
			case 'string':
				if (typeof value !== 'string') return false;

				// If the parameter has values, check if the value is valid
				if (
					ALLOWED_PARAMETERS[name].values &&
					!ALLOWED_PARAMETERS[name].values.includes(value)
				) return false;

				// Check if the value is a valid string
				if (!STRING_REGEX.test(value)) return false;

				// Push the parameter
				this.parameters[name] = value;

				break;

			// Integer
			case 'integer':
				if (typeof value !== 'number') return false;

				// Validate min
				if (
					ALLOWED_PARAMETERS[name].min &&
					value < ALLOWED_PARAMETERS[name].min
				) return false;

				// Validate max
				if (
					ALLOWED_PARAMETERS[name].max &&
					value > ALLOWED_PARAMETERS[name].max
				) return false;

				// Push the parameter
				this.parameters[name] = parseInt(value).toString();

				break;

			// Array of integers
			case 'integer-array':
				const array = [];

				if (!Array.isArray(value)) return false;

				// Validate length
				if (
					ALLOWED_PARAMETERS[name].length &&
					value.length !== ALLOWED_PARAMETERS[name].length
				) return false;

				// Validate each element
				value.forEach((element) => {
					if (typeof element !== 'number') return false;

					// Validate min
					if (
						ALLOWED_PARAMETERS[name].min &&
						element < ALLOWED_PARAMETERS[name].min
					) return false;

					// Validate max
					if (
						ALLOWED_PARAMETERS[name].max &&
						element > ALLOWED_PARAMETERS[name].max
					) return false;

					// Push the element
					array.push(parseInt(element).toString());
				});

				// Push the parameter
				this.parameters[name] = array.join(' ');

				break;

			default:
				return false;
		}

		return true;
	}

	/**
	 * Build the parameters string.
	 *
	 * @returns {String} The parameters string.
	 */
	buildParameters() {
		let paramString = '';

		// If there is an error, return an empty string
		if (this.error) return paramString;

		// Loop through the parameters and build the parameters string
		Object.keys(this.parameters).forEach((key) => {
			paramString += key + '="' + this.parameters[key] + '" ';
		});

		// Return the parameters string
		return paramString;
	}

	/**
	 * This function returns the SVG string.
	 *
	 * @returns {String} The SVG string.
	 */
	build() {
		// Return the SVG string
		return '<svg ' +
					this.buildParameters() +
				'>' +
					this.buildChildren() +
				'</svg>';
	}
};


/**
 * This class represents a Basic SVG.
 * It is used to build a basic SVG string, with width and height controls.
 *
 * @class
 * @extends SVG
 * @property {Number} width - The SVG width.
 * @property {Number} height - The SVG height.
 * @property {SVG[]} children - The SVG children.
 */
class BasicSVG extends SVG {
	/**
	 * This function creates a new BasicSVG object.
	 *
	 * @param {Number} width - The SVG width.
	 * @param {Number} height - The SVG height.
	 * @param {Array} children - The SVG children.
	 *
	 * @override
	 * @see SVG#constructor
	 */
	constructor(width = 400, height = 200, children = []) {
		// Call the parent constructor
		super(children);

		// If there is an error, return
		if (this.error) return;

		// If the width is not a number, return
		if (typeof width !== 'number') {
			this.error = true;
			this.message = 'Invalid width';

			return;
		}

		// If the height is not a number, return
		if (typeof height !== 'number') {
			this.error = true;
			this.message = 'Invalid height';

			return;
		}

		// Set the width and height
		this.width = width;
		this.height = height;
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
		return '<svg ' +
					'xmlns="http://www.w3.org/2000/svg" ' +
					'width="' + this.width + '" ' +
					'height="' + this.height + '" ' +
					'viewBox="0 0 ' + this.width + ' ' + this.height + '" ' +
					this.buildParameters() +
				'>' +
					this.buildChildren() +
				'</svg>';
	}
};


// Export SVGs class
module.exports = {SVG, BasicSVG};
