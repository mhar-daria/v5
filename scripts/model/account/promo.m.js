module.exports = Backbone.Model.extend({

	initialize: function() {

	},

	setUrl: function (url) {
		this.url = CCP.utils.rest('promocode/' + url);
		return this;
	},

	url: function() {
		return CCP.utils.rest('promocode');
	}

});

// # proomo.m.js