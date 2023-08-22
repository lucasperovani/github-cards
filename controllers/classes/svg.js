/**
 * This class represents an SVG.
 * It is used to build an SVG string.
 * 
 * @class
 * @property {boolean} error - The error status.
 * @property {string} message - The error message.
 * @property {SVG[]} children - The SVG children.
 */
class SVG {
    /**
     * This function creates a new SVG object.
     *
     * @param {Array} children - The SVG children.
     *
     * @returns {SVG} The SVG object.
     */
    constructor(children = []) {
        // If it is not an array, give an error
        if (!Array.isArray(children)) {
            this.error = true;
            this.message = 'Invalid children array';
            this.children = [];

            return;
        }

        // Check if all children are SVGs
        const areSVG = children.every(child => (child instanceof SVG));

        // If not, give an error
        if (!areSVG) {
            this.error = true;
            this.message = 'Invalid children';
            this.children = [];

            return;
        }
    
        this.error = false;
        this.message = 'OK';
        this.children = children;
    }

    /**
     * Get the error status.
     *
     * @return {boolean} The error status.
     */
    getError() {
        return {error: this.error, message: this.message};
    }

    /**
     * Push a child to the SVG.
     *
     * @param {SVG} child - The child to push.
     *
     * @return {Boolean} The push status.
     */
    pushChild(child) {
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
     * @return {string} The children SVG string.
     */
    buildChildren() {
        // If there is an error, return an empty string
        if (this.error) return '';

        // Loop through the children and build the SVG string
        let svg = '';
        this.children.forEach(child => svg += child.build());

        // Return the SVG string
        return svg;
    }

    /**
     * This function returns the SVG string.
     * 
     * @return {string} The SVG string.
     */
    build() {
        // Return the SVG string
        return '<svg ' + 
                    'xmlns="http://www.w3.org/2000/svg" ' +
                    'viewBox="0 0 400 200"> ' +
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
 * @property {number} width - The SVG width.
 * @property {number} height - The SVG height.
 * @property {SVG[]} children - The SVG children.
 */
class BasicSVG extends SVG {
    /**
     * This function creates a new BasicSVG object.
     * 
     * @param {number} width - The SVG width.
     * @param {number} height - The SVG height.
     * @param {Array} children - The SVG children.
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
     * @return {string} The SVG string.
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
                    'fill="none" ' +
                    'role="img" ' +
                    'aria-labelledby="descId" ' +
                    'viewBox="0 0 ' + this.width + ' ' + this.height + '"> ' +
                    this.buildChildren() +
                '</svg>';
    }
};

// Export the SVG class
module.exports = {SVG, BasicSVG};
