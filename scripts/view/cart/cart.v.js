module.exports = Backbone.View.extend({

	el: '#checkout-page',

	events: {

		'click #btn-discount' 			: 'discountCoupon',
		'keydown #credit_points'		: 'onKeyDownAccountCredit',
		'submit #account_credit'		: 'redeemFromCredits'

	},

	cartM: require('./../../model/cart/cart.m.js'),

	promoCodeM: require('./../../model/account/promo.m.js'),

	creditM: require('./../../model/account/credit.m.js'),

	initialize: function () {
		this.cartM = new this.cartM;
		this.promoCodeM = new this.promoCodeM;
		console.log(this.promoCodeM.url(), this.cartM.url())
		this.render();
		this.$el.find('form#account_credit').parsley();

	},

	notClickable : [],

	// click discount
	discountCoupon: function (e) {
		e.preventDefault();
		var name = 'promo-code';

		if ( this.notClickable && this.notClickable.indexOf(name) > -1 ) {
			return false;
		}

		this.notClickable = this.notClickable.concat(name);

		var $parent = $(e.target).closest('#promo-code-container'),
			$code 	= $parent.find('#discount-code'),
			code 	= $code.val(),
			_me 	= this;

		if ( ! code ) {
			alert(CCP.utils.getMessage('promo.invalid'));
			return;
		}

		this.promoCodeM.setUrl(code).fetch()
			.then(function (resp) {
				_me.notClickable.splice(name, 1);

				var mess = resp.message && resp.message.text 
							? resp.message.text 
							: '',
					promo_type = (resp.message && resp.message.promo_type) ? resp.message.promo_type : 0,
					discount = (resp.message && resp.message.discount) ? resp.message.discount : 0,
					discounted_price = (resp.message && resp.message.discounted_price) ? resp.message.discounted_price : 0;
				
				if ( promo_type > 0 ) {
					$code.attr('disabled', 'disabled');
					$parent.find('.discount-amount').text(CCP.utils.monefy(discount));
					_me.$el.find('.grand-total').find('span').text(CCP.utils.monefy(discounted_price));
				} else {
					$code.val('');
				}
				alert(mess, 1);

			})
			.fail(function (err, status, xhr) {
				_me.notClickable.splice(name, 1);
				var errMessage = JSON.parse(err.responseText);
					errMessage = (errMessage && errMessage.message && errMessage.message.text)
									? errMessage.message.text
									: '';

					if (errMessage.length) {
						alert(errMessage);
					}

			});

	},

	render: function () {

		var _me = this;

		$('#confirm-remove').on('show.bs.modal', function(e) {

			var targetId = $(e.relatedTarget).data('ccx'),
			isChild = ! isNaN(targetId),
			message = (!isChild) ? 
						'are your sure you want to remove this collection' : 
						'are you sure you want to remove this deal';

			$(this).find('.modal-body > p')
						.text(message);

			$(this).find('.rm-deal')
						.attr('data-deal_id', targetId);

		});

		$('#confirm-remove').on('click', '.rm-deal', function(e) {

			var id = $(e.target).attr('data-deal_id');

			$('#rm-ccx-' + id).submit();

			return true; 

		});

	},

	redeemFromCredits: function (e) {
		e.preventDefault();

		var name = 'credit-points';

		if ( this.notClickable && this.notClickable.indexOf(name) > -1 ) {
			return false;
		}

		this.notClickable = this.notClickable.concat(name);

		var $formParent = $(e.target).closest('form'),
				$creditElem = $formParent.find('#credit_points'),
				$totalPriceElem = this.$el.find('#total_price'),
				credit 			= $creditElem.val(),
				totalPrice 	= $totalPriceElem.val(),
				newTotalPrice = totalPrice-credit;

		// disabled addition of extra credits
		$creditElem.attr('disabled', 'disabled');

		// add beautify and more readable numbers
		$formParent.find('span.credit-discount').text(CCP.utils.monefy(credit, null, 'P'));

		// change total price
		$totalPriceElem.val(newTotalPrice);

		// update the total price
		this.$el.find('.grand-total > span').text(CCP.utils.monefy(newTotalPrice, null, 'P'));

		// update credit discount
		$formParent.find('span.credit-discount').text();

		return true;

	},


	// validation
	onKeyDownAccountCredit: function (e) { // allow only letters

		var keyCode = e.keyCode ? e.keyCode : e.which;

		if ( (keyCode >= 48 && keyCode <= 57) ||
				 (keyCode >= 96 && keyCode <= 105) ||
				 (keyCode == 8 || keyCode == 13)) {
			return true;
		}

		return false;
	}

});

// #cart.v.js