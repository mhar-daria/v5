module.exports = Backbone.View.extend({
	el: '#desktop-navigation',

	mainTemplate: _.template(require('./../../../../templates/subnav/subnav.main.tpl.html')),

	boxTemplate: _.template(require('./../../../../templates/subnav/box.tpl.html')),

	subnavM: require('./../../model/subnav/subnav.m.js'),

	limit: 4,

	initialize: function() {

		var m 		= new this.subnavM(),
			_me 	= this;

		m.fetch().then(function(resp) {

			_.each(resp, function(deals, categoryId) {
				
				var counter	= 0;

				_me.$el.append(_me.mainTemplate({ 
					category_id: categoryId,
					category_name: CCP.utils.getCategoryNameById(categoryId)
				}));

				_.each(deals, function(deal, key) {

					counter++;
					if ( counter > _me.limit ) return;

					_me.$el.find('categoryId-child-menu').find('.nav-deal-container').append(_me.boxTemplate(deal));

				});

			});

		}).fail(function(err) {
			_me.$el.html('<p class="text-center initial">No deals found...</p>');
		});
	}
});

// #subnav.js