module.exports = Backbone.View.extend({

	el: '#travel-dealpage',

	initialize: function () {

		this.changeMap();
	},

	showHorizontalNav: function (e) {

		e.preventDefault();

		var $elem = $(e.target),
		    boxId = $elem.attr('href');

		var $box = this.$el.find(boxId);

		if (_.size($box)) {

			if (!$box.is(':hidden')) {

				return true;
			}

			this.$el.find('#horizontal-tabs a').parent().removeAttr('class'); // remove selected to all link

			this.$el.find('section.horizontal-nav-boxes').hide(); // hide all horizontal nav boxes

			$elem.parent().addClass('selected offer'); // add active class

			$box.show(); // show box

			return true;
		}

		return false;
	},

	changeMap: function () {

		var branches = this.$el.find('#_branches').val(),
				selectedBranch = this.$el.find('#branches').val();

		var branch = _.find(JSON.parse(branches), {id: parseInt(selectedBranch)});

		CCP.maps.setGmap(branch.latitude, branch.longitude, '#map-canvas', {});

		return this;
	},

	events: {
		'click #horizontal-tabs a': 'showHorizontalNav',
		'change #branches': 'changeMap',
	},
});

// #travel-dealpage.js