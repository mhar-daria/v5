module.exports = Backbone.Model.extend({

	url: function () {
		return CCP.utils.rest('category');
	}

});