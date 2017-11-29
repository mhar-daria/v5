module.exports = Backbone.View.extend({

	initialize: function (options) {

		if ( options && options['id'] && this[options['id']]) {

			this[options['id']]();
		}

		return;
	},

	travel: function () {

		$(document).on('mouseenter', 'div.hoverable', function (e) {

			var $_this = $(this),
				hoverElem = $_this.data('hover');

			$_this.find(hoverElem).stop(true, true).fadeIn('fast');
			return true;
		});

		$(document).on('mouseleave', 'div.hoverable', function (e) {

			var $_this = $(this),
				hoverElem = $_this.data('hover');

			$_this.find(hoverElem).stop(true, true).fadeOut('fast');
			return true;
		});
	},

	category: function () {

		$(document).on('mouseenter', 'div.deal-box-container', function (e) {

			$(this).find('h3#df-hover').show()
					.end()
				.find('h3#desktop-from').hide();
		});

		$(document).on('mouseleave', 'div.deal-box-container', function (e) {

			$(this).find('h3#df-hover').hide()
					.end()
				.find('h3#desktop-from').show();
		});
	},

	collection: function () {

		$(document).on('mouseenter', 'div.deal-box-container', function (e) {

			$(this).find('.hover-pop').show();
		});

		$(document).on('mouseleave', 'div.deal-box-container', function (e) {

			$(this).find('.hover-pop').hide();
		});
	}
});