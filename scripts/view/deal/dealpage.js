module.exports = Backbone.View.extend({

	el: '#dealpage',

	events: {
		'click button.btn-buynow': 'buyNow'
	},

	buyNow: function (e) {

		e.preventDefault();

		var $selects 		= this.$el.find('select'),
			$quantity 		= this.$el.find('#quantity'),
			quantity 		= $quantity.val(),
			max_quantity	= $quantity.data('max_quantity'),
			isValid 		= true;

		$.each($selects, function( key, $elem ) {

			$elem = $($elem);

			if ( $elem.val() == 'default' || $elem.val() == '' ) {
				alert($elem.attr('name') + ' is required');
				isValid = false;
			}

		});

		if ( ! isValid ) {
			return false;
		}

		if ( quantity < 1 ) {
			alert('Quantity should be greater or equal 1');
			return false;
		} else if ( quantity > max_quantity ) {
			alert('Insufficient stocks');
			return false;
		}

		$(e.target).closest('form').submit();

	},

	initialize: function () {

		this.render();
	},

	render: function () {
		var _me = this,
			$gallery = this.$el.find('.deal-gallery');

		$gallery.swipe({
			threshold:75,

			swipeLeft: function() {
				$gallery.find('a.right').trigger('click',1);
			},

			swipeRight: function() {
				$gallery.find('a.left').trigger('click', 1);
			}
		});

	}

});

// #dealpage.js