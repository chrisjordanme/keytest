var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Agent Model
 * ==========
 */

var Agent = new keystone.List('Agent');

Agent.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Agent.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

Agent.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Agent.defaultColumns = 'name, email, isAdmin';
Agent.register();
