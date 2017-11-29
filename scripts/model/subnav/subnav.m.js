module.exports = Backbone.Model.extend({

		initilize: function() {

		},

		urlRoot: function() {
			return CCP.utils.rest('subnav');
		}

	});
