module.exports = Backbone.Collection.extend({

	model: require('./../../model/category/category.m.js'),

	url: function () {
		return CCP.utils.rest('category');
	},

	setUrl: function ( url ) {
		this.url = CCP.utils.rest( url );
		return this;
	}

});