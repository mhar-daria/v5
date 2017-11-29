var CCP = window.CCP || {};

require('./scripts/view/resources/config.js');
require('./scripts/view/resources/parsley.addons.js');
// utilities
require('./scripts/view/resources/utils.js');
// maps
require('./scripts/view/resources/google.maps.js');

// routing
var router = require('./router');

var header = require('./scripts/view/header/header.v.js');

var footer = require('./scripts/view/footer/footer.v.js');

(function() {

	// lazyload images
	$('img.images-lazy').lazyload({
		threshold: 200,
	})
	.removeClass('images-lazy')
	.filter(':in-viewport').trigger('appear');

  $(".dropdown").hover(
    function() {
      $(this).find($(this).data('target')).stop( true, true ).fadeIn("fast");
    },
    function() {
      $(this).find($(this).data('target')).stop( true, true ).fadeOut("fast");
  });

  $('.navigation a').hover(function (e) {
  var dropdownMenu = $(this).data('dropdown-menu'),
      categoryMenu = $(this).data('category-menu');

  var $dropdownMenu = $(dropdownMenu),
      $categoryMenu = $dropdownMenu.find(categoryMenu);

  if ( $dropdownMenu.is(':hidden') || $dropdownMenu.hasClass('out') ) {

    $dropdownMenu.removeClass('out').stop(true, true).fadeIn('fast');
  }

  $dropdownMenu.find('[class$=child-menu]').hide();
  if ( categoryMenu ) {

    $categoryMenu.show();
  }

  clearTimeout(window.parentTimer);
  return;
  }, function (e) {

  var _me = $(this),
      dropdownMenu = $(this).data('dropdown-menu'),
      $dropdownMenu = $(dropdownMenu);

  window.parentTimer = setTimeout(function(e) {

    if ( $dropdownMenu.is(':hover') ) {

      window.childTimer = setTimeout(function (e) {
        $dropdownMenu.one('mouseleave', function () {
          
          if ( _me.is(':hover') ) {

              return;
          }

          $(this).addClass('out').end().stop(true, true).fadeOut('fast').removeClass('out');
        });
        clearTimeout(window.childTimer);
      }, 100);

      clearTimeout(window.parentTimer);
      return;
    }

    $dropdownMenu.addClass('out').stop(true, true).fadeOut('fast');
    clearTimeout(window.parentTimer);
  }, 100);
  });

	// for return to top link
	$('.return-to-top .slide-up').on('click', function (e) {
  	e.preventDefault();

  	e.preventDefault();
  	$('body,html').animate({
        scrollTop: 0
    }, 800);

    return true;
  });

	// for boxes
  $("div.custom-box-price").hover(
    function() {
      $('h2', this).show();
      $('button:last', this).hide();
    },
    function() {
    	$('h2', this).hide();
      $('button:last', this).show();
	});

	// router
	new router;

	// header
	new header;

	// footer views
	new footer;
}());
