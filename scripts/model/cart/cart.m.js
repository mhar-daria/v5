module.exports = Backbone.Model.extend({

	urlRoot: function () {
		return CCP.utils.url('api/vi/cart');
	}

});

// #cart.m.js