module.exports = Backbone.View.extend({

	el: '#footer-content',

	subscribeM: require('./../../model/account/subscribe.m.js'),

	events: {
		'submit form#frm-footer-subscribe'			: 'subscribeForm',
		// 'click .read-more'											: 'readMore'
	},

	initialize: function () {
		this.subscribeM = new this.subscribeM;

	},

	render: function () {

	},

	subscribeForm: function (e) {
		e.preventDefault();

		var $parent = this.$el.find('form#frm-footer-subscribe'),
				$email 				= $parent.find('input#email'),
				data					= {
					email 				: $email.val(),
					utm_source 		: $parent.find('input#utm_source').val() || '',
					source 				: $parent.find('input#source').val() || '',
					campaign_name	: $parent.find('input#campaign_name').val() || '',
					category			: window.location.pathname.split('/').pop() || 'Home',
					url						: window.location.href
				};

		this.subscribeM.save(data, {
			success: function (model, response) {
				response = response.responseJSON;

				if ( response instanceof Object ) {
					if ( response.message && response.message.text ) {
						alert(response.message.text, 1);
					}
				} else {
					alert('Congrats! you have successfully subscribe to CashCashPinoy', 1);
				}
			},
			error: function (model, response, options) {
				var response = response.responseJSON;
				if ( response instanceof Object ) {
					if ( response && response.email ) {
						alert(response.email.shift());
					}

					if ( response && response.status && response.status == 'error' ) {
						alert((response.message && response.message.text ) ? response.message.text : 'You have enter an invalid credentials');
					}
				}	else {
					alert('You have enter an invalid credentials');
				}
			}
		});
	},

	readMore: function (e) {
		e.preventDefault();

		var $footerText = this.$el.find('#footer-text').find('p'),
		    $readMore = null;

		if ($footerText) {

			$readMore = $footerText.find('a');

			if ($readMore) {

				if ($readMore.text() == '[read more]') {

					$readMore.text('[show less]');
					$footerText.find('span').html($footerText.data('full_text'));
				} else {

					$readMore.text('[read more]');
					$footerText.find('span').html($footerText.data('initial_text'));

				}
			}

			return true;
		}

		return false;
	}

});