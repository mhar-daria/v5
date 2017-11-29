module.exports = Backbone.View.extend({

	el: '#header-container',

	subnav: require('./subnav.v.js'),

	login: require('./login.v.js'),

	initialize: function () {

		// new this.subnav({
		// 	el: '#submenu'
		// });
		new this.login();
	},

	render: function () {

	}

});