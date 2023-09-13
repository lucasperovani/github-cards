/**
 * This class represents an SVG Parameter.
 * It is used to build an SVG Parameter string.
 *
 * @class
 * @property {Boolean} error - The error status.
 * @property {String} message - The error message.
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
     * @return {String} This parameter name.
     */
    getParameterName() {
        return this.parameterName;
    }

    /**
     * Set the parameter value.
     */
    setParameterValue(value) {
        this.value = value;
    }

    /**
     * Build this parameter, returning a string.
     *
     * @return {String} The SVG Parameter string.
     */
    build() {
        return '';
    }
};


// Export SVGs class
module.exports = {Parameter};