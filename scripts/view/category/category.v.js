module.exports = Backbone.View.extend({

	el: '#category-page',

	pagination: require('./../resources/pagination.js'),

	tpl: null,

	initialize: function (options) {

		var g = require('./../../view/resources/global.js');

		this.tpl = (options && options.section && options.section == 'travel') ? require('./../../../../templates/default/travel-dealbox.html') : require('./../../../../templates/default/dealbox.html');

		_.extend(this.pagination.prototype, {

			el: '#category-page',
			
			template: _.template(this.tpl),

			page: 2,

			limit: 20,

			url: 'category',

			collectionBox: '.home-deal-group',

			requests: {
				category_id: CCP.utils.getCategoryIdbyCategoryName(options.section),
			},

			initialize: function() {
				console.log(options.section)
				this.paginate();
			}
		});

		new this.pagination;

		if ( options && options['section'] ) {

			new g({ id: options['section'] == 'travel' ? 'travel' : 'category' });
		}
	},

	render: function () {

	},
});