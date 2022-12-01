'use strict';

module.exports = {
	...require('./schema.js'),
	...require('./types.graphql'),
	queries: require('./queries.graphql'),
	mutations: require('./mutations.graphql'),
};
