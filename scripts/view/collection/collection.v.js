module.exports = Backbone.View.extend({

	el: '#collection-page',

	pagination: require('./../resources/pagination.js'),

	tpl : null,

	initialize: function (options) {

		this.tpl = (options && options.category_name && options.category_name == 'travel') ? require('./../../../../templates/default/travel-dealbox.html') : require('./../../../../templates/default/dealbox.html');

		_.extend(this.pagination.prototype, {

			el: '#category-page',

			collectionBox: '.home-deal-group',
			
			template: _.template(this.tpl),

			page: 2,

			limit: 20,

			requests: {
				'category_id': CCP.utils.getCategoryIdbyCategoryName(options.category_name),
				'collection_id': (options.collection_name) ? options.collection_name.split('-').shift() : '',
			},

			url: 'collection',

			initialize: function() {
				this.paginate();
			}
		});

		new this.pagination;

	},

	render: function () {


	},

	showHover: function (e) {

		var _this = $(e.target).closest('.deal-box-container');

		_this.find('.hover-pop').stop(true, true).fadeIn('slow');

	},

	hideHover: function (e) {

		var _this = $(e.target).closest('.deal-box-container');

		_this.find('.hover-pop').stop(true, true).fadeOut('slow');
	},


	// for quantity
	addQuantity: function (e) {
		e.preventDefault();

		var $parent = $(e.target).closest('.hover-pop'),
		    $quantity = $parent.find('.quantity_input'),
		    quantity = parseInt($quantity.val()) || 1,
		    maxQuantity = parseInt($quantity.data('parsley-max')) || 100,
		    step = parseInt($quantity.data('step')) || 1;

		var newQuantity = Math.abs(quantity + step);

		if (newQuantity > maxQuantity) {

			alert('You have reach the maximum amount to this deal.');
			return false;
		}

		$quantity.val(newQuantity);
		return true;
	},

	minusQuantity: function (e) {
		e.preventDefault();

		var $parent = $(e.target).closest('.hover-pop'),
		    $quantity = $parent.find('.quantity_input'),
		    quantity = parseInt($quantity.val()) || 1,
		    minQuantity = parseInt($quantity.data('parsley-min')) || 100,
		    step = parseInt($quantity.data('step')) || 1;

		var newQuantity = Math.abs(quantity - step);

		if (newQuantity < minQuantity || newQuantity < 0) {

			alert('You have reach the minimum amount to this deal.');
			return false;
		}

		$quantity.val(newQuantity);
		return true;
	},

	// add to cart
	addToCart: function (e) {

		e.preventDefault();

		var $parent = $(e.target).closest('.hover-pop');

		$parent.find('form.add-to-cart').submit();
		return true;
	},
	// end quantity

	events: {
		// deal box hover
		'mouseover .deal-box-container': 'showHover',
		'mouseleave .deal-box-container': 'hideHover',

		// input quantity
		'click .hover-pop .btn-add' : 'addQuantity',
		'click .hover-pop .btn-minus' : 'minusQuantity',

		// add to cart click
		'click .hover-pop .btn-addtocart': 'addToCart',
	},
});