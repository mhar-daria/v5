module.exports = Backbone.Model.extend({

	initialize: function() {

	},

	url: function () {
		return CCP.utils.rest('credit');
	}

});