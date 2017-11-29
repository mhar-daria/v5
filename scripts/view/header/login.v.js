module.exports = Backbone.View.extend({

	el: '#modalLogin',

	initialize: function () {

	},

	render: function () {

	},

	fbLogin: function (e) {
		e.preventDefault();

		FB.getLoginStatus(function(resp) { 

			if ( resp.status !== 'connected' ) {

				FB.login(function(resp) {
					if( resp.status == 'connected' ) {

						window.location.href = CCP.utils.url('social/facebook');
					}
				},
				function ( resp ) {

					console.log('fb login failed');

				}, {scope: CCP.utils.fbPerms.scope});

				return;
			}

			window.location.href = CCP.utils.url('social/facebook');

		});
	},

	forgotPassword: function (e) {

		e.preventDefault();

		this.$el.find('.forgot-password').show()
			.end()
		.find('.already-member').hide();

		return true;
	},

	backToLogIn: function (e) {

		e.preventDefault();

		this.$el.find('.forgot-password').hide()
			.end()
		.find('.already-member').show();
	},

	events: {
		'click #fb-login': 'fbLogin',
		'click a.btn-forgotpass': 'forgotPassword',
		'click a.fogot-back': 'backToLogIn'
	}

});