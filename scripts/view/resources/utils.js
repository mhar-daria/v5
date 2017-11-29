window.CCP = window.CCP || {};

CCP.pattern = {

	and: /[&]/gi,

	hours: /hrs/gi,

	nonWord: /[^\w ]/g,

	whitespace: /([ ]{1,})/g

};

CCP.utils = {

	messages: {
	
	},

	url: function( url ) {

		return window.location.origin + '/' + (url || '');

	},

	localImageUrl: function (url) {
		return this.url('images/' + url);
	},

	dealImageCdn: function (url) {

	},

	getDiscountPercentage: function( originalPrice, discountedPrice ) {

		return Math.round(100-(discountedPrice/originalPrice*100));

	},

	dealCdn: function (url) {

		return this.imageCdn('upload/deals/' + url );
		
	},

	imageCdn: function ( img ) {

		return 'http://image.cashcashpinoy.com/' + img;

	},

	setPermalink: function ( title, glue ) {

		title = $.trim(title);
		glue = ( glue && glue.length ) ? glue : '-';

		if ( ! title ) {
			return false;
		}

		return title.toLowerCase()
					.replace( CCP.pattern.and, 'and' )
					.replace( CCP.pattern.hours, 'hours' )
					.replace( CCP.pattern.nonWord, '' )
					.replace( CCP.pattern.whitespace, glue );
	},

	// set url
	setURL: function ( ref_id, title, type, glue ) {

		if ( ! ref_id || ! title ) {
			return this.url();
		}

		var url = this.url();

		if ( type == 'collection' ) {
			url += 'collection/' + ref_id + '-' + this.setPermalink( title );
		} else {
			url += 'deal/' + ref_id + '-' + this.setPermalink( title );
		}

		return url;

	},

	// fbpermission
	fbPerms: {
		scope: 'email,user_birthday'
	},

	// return rest url
	rest: function(url) {
		return (this.url('api/v1/') + url.toString());
	},

	monefy: function(money, decimal, currency) {

		money = $.trim(money).toString();
		decimal = $.trim(decimal);
		currency = $.trim(currency).toString();

		if ( ! money ) {
			return (currency + '' + 0);
		}

		if ( ! decimal ) {
			return (currency + '' + money.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		}

		money = money.split('.');
		var mm = money[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		var suffix = (money && money[1]) ? ('.' + money[1].substr(0, 2)) : '00';

		return currency + mm + suffix;

	},

	scrollTop: function (top, time) {
		time = time || 800;

		$('html, body').animate({
      scrollTop: top
    }, time);

    return true;

	},

	categories: function () {
		return {
			1: { // home
				'name'              : 'New',
        'display_name'      : 'New',
        'slug'              : '/',
        'img'               : '',
        'class'             : '',
        'category_id'       : 1,
        'deal_tags'         : [],
        'order'             : 1
			},

			2: { // food and dining
				'name'              : 'Food and Dining',
	      'display_name'      : 'Dining',
	      'slug'              : 'dining',
	      'img'               : 'img-sealldining.png',
	      'class'             : 'cb-dining',
	      'category_id'       : 2,
	      'deal_tags'         : [],
	      'order'             : 7
			},

			3: { // electronics
				'name'              : 'Electronics',
        'display_name'      : 'Electronics',
        'slug'              : 'electronics',
        'img'               : 'img-seallelec.png',
        'class'             : 'cb-elec',
        'category_id'       : 3,
        'deal_tags'         : []
			},

			4: {
				'name'              : 'Travel',
        'display_name'      : 'Travel',
        'slug'              : 'travel',
        'img'               : 'img-sealltravel.png',
        'class'             : 'cb-travel',
        'category_id'       : 4,
        'deal_tags'         : []
			},

			5: { // beauty
				'name'              : 'Beauty and Wellbeing',
        'display_name'      : 'Beauty',
        'slug'              : 'beauty',
        'img'               : 'img-seallbeauty.png',
        'class'             : 'cb-beauty',
        'category_id'       : 5,
        'deal_tags'         : []
			},

			6: { // home
				'name'              : 'Home and Decor',
        'display_name'      : 'Home & Kids',
        'slug'              : 'home-kids',
        'img'               : 'img-seallhome.png',
        'class'             : 'cb-home',
        'category_id'       : 6,
        'deal_tags'         : []
			},

			7: {
				'name'              : 'Fashion and Accessories',
        'display_name'      : 'Fashion',
        'slug'              : 'fashion',
        'img'               : 'img-seallfashion.png',
        'class'             : 'cb-fashion',
        'category_id'       : 7,
        'deal_tags'         : []
			},

			21: { // lifestyle
				'name'              : 'Leisure and Lifestyle',
	      'display_name'      : 'Lifestyle',
	      'slug'              : 'lifestyle',
	      'img'               : 'img-sealllifestyle.png',
	      'class'             : 'cb-lifestyle',
	      'category_id'       : 21,
	      'deal_tags'         : []
			}
		};
	},

	travelTags: ['city-hotels', 'getaways', 'local', 'international'],

	getTravelTags: function () {

		return this.travelTags;
	},

	getCategoryIdbyCategoryName: function ( category_name ) {

		var categories = _.toArray(this.categories());

		if ( ! category_name ) {
			return null;
		}

		var category = _.find(categories, function (category) {
			return category.slug == category_name;
		});

		if (category) {
			return category.category_id;
		}

		return null;
	},

	// get all category names
	getCategorySlugs: function () {

		var categories = this.categories();

		return _.map(categories, function (category) {
			return category.slug;
		});
	},

	getCategoryNameById: function (id) {

		var categories = this.categories();

		return ( categories && categories[id] )
			? categories[id]['name']
			: [];
	},

	// return all category names
	getCategoryNames: function () {

		var categories = this.categories();

		return _.map(_.toArray(categories), 'slug');
	},

	getCategorySlugById: function (id) {

		var categories = this.categories();

		return (categories && categories[id])
			? categories[id]['slug']
			: [];
	},

	math: {

		discount: function ( price, originalPrice ) {
			return (originalPrice == 0 || isNaN(originalPrice))
                ? 0 
                : Math.round(100-(price/originalPrice*100));
		}

	},

	// diff days
	dateDiff: function ( starts_date, ends_date ) {

		starts_date = new Date(starts_date);
		ends_date = new Date(ends_date);

		var days = 24*60*60*1000,
				hours = 60*60*1000,
				seconds = 60*1000;

		var result = (starts_date.getTime() - ends_date.getTime());

		return {
			days: Math.floor(Math.abs(result/days)),
			hours: Math.floor(Math.abs(result/days)),
			seconds: Math.floor(Math.abs(result/days))
		};

	},

	getDealStocks: function (initial, sold, reserved) {

		return initial - (sold+reserved);
	},

	getDealMaxQuantity: function (stocks, incremental_qty) {

		if (incremental_qty < 1) {

				return (stocks == 9999) ? 20 : stocks;
		}

		return (stocks - (stocks % incremental_qty));
	}

};

// #utils.js