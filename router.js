// this will handle all the routing for dynamic loading of modules

module.exports = function() {

		// contact us
		crossroads.addRoute('/contactus', function () {
			var $el = '#contact-form';

			$($el).parsley();

			$($el).find('#phone').on('keydown', function(e) {
				var keyCode = ( e.keyCode ) ? e.keyCode : e.which;
				
				if ( (keyCode >= 48 && keyCode <= 57) ||
					 (keyCode >= 96 && keyCode <= 105 ) ||
					 (keyCode == 8 || keyCode == 9 || keyCode == 13 || keyCode == 116)
					 ) {
					return true;
				}

				return false;
			});

			$($el).on('submit', function(e) {

				var phone = $($el).find('#phone').val();

				if (phone.length > 0 && !/^(\+63|0)\d{10}$/.test(phone) && !/^(02)?\d{5,7}$/.test(phone)) {
		            alert('Invalid phone number format. Valid format: 09179293458 - 029348945 - 7993920', 0);
		            e.preventDefault();
		            return false;
		        }

			});

		});

		// route for homepage
		crossroads.addRoute('/', function () {
			var g = require('./scripts/view/resources/global.js');
			new g({ id: 'category' });
		});

		// route for cart
		crossroads.addRoute('/cart', function() {

			var cart = require('./scripts/view/cart/cart.v.js');
			new cart;

		});

		// delivery page
		crossroads.addRoute('/deliveries/:page:', function (page) {
			if ( page == 'return' ) {
				CCP.utils.scrollTop(($("#return_policy").offset().top - $('.navbar').outerHeight()));
			}
			return true;
		});

		// faq page
		crossroads.addRoute('/faq/:page:', function (page) {
			if ( page && page.length ) {
				CCP.utils.scrollTop(($("#"+page).offset().top - $('.navbar').outerHeight()));
			}
		});

		// routes for category page
		var category = crossroads.addRoute('/{section}/:tagname:',
			function (section) {

				var a = require('./scripts/view/category/category.v.js');
				new a({ section: section });
		});
		
		category.rules = {
			tagname: ['city-hotels', 'getaways', 'local', 'international'],

			section: function (value, request, params) {
				var categorySlugs = CCP.utils.getCategorySlugs();

				return (_.indexOf(categorySlugs, params.section) > -1) 
								? true 	
								: false;
			}
		};

		// routes for collection page
		var collection = crossroads.addRoute('/{category_name}/collection/{collection_name}',
		function ( category_name, collection_name ) {

			var a = require('./scripts/view/collection/collection.v.js');
			new a({category_name: category_name, collection_name: collection_name});
		});

		collection.rules = {

			category_name: CCP.utils.getCategoryNames(),

			collection_name: function ( value, request, params ) {

				var categorySlugs = CCP.utils.getCategorySlugs(),
						dealPattern = /^\d+(?!\-)(?:\d\-)(?:[a-z0-9\-]+)$/g;

				return (params.collection_name.match(dealPattern))
					? true
					: false;
			}
		};

		// deal page
		var deal = crossroads.addRoute('/{category_name}/deal/{deal_name}',
		function ( category_name, collection_name ) {

			var a = require('./scripts/view/deal/travel-dealpage.v.js');
			new a();
		});

		deal.rules = {

			category_name: CCP.utils.getCategoryNames(),

			deal_name: function ( value, request, params ) {

				var categorySlugs = CCP.utils.getCategorySlugs(),
						dealPattern = /^\d+(?!\-)(?:\d\-)(?:[a-z0-9\-]+)$/g;

				return (params.deal_name.match(dealPattern))
					? true
					: false;
			}
		};

		var dealWithTags = crossroads.addRoute('/{category_name}/{deal_tags}/deal/{deal_name}',
		function ( category_name, deal_tags, collection_name ) {

			var a = require('./scripts/view/deal/travel-dealpage.v.js');
			new a();
		});

		dealWithTags.rules = {

			category_name: CCP.utils.getCategoryNames(),

			deal_tags: CCP.utils.getTravelTags(),

			deal_name: function ( value, request, params ) {

				var categorySlugs = CCP.utils.getCategorySlugs(),
						dealPattern = /^\d+(?!\-)(?:\d\-)(?:[a-z0-9\-]+)$/g;

				return (params.deal_name.match(dealPattern))
					? true
					: false;
			}
		};

		// this will log every change of url
		crossroads.parse(window.location.pathname);

 };

// #router.js