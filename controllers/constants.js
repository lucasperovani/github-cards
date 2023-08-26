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

const STRING_REGEX = /^[a-zA-Z0-9-_@() ]+$/;


// Export constants
module.exports = {
	ALLOWED_PARAMETERS,
	STRING_REGEX,
};
