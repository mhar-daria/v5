// additional ajax header
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="s-key"]').attr('content')
	}
});

window.CCP = window.CCP || {};

window.CCP.config = {

	maps: {

		
	},
};