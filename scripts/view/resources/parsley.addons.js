// login validation for uppercase
window.Parsley.addValidator('uppercase', {
	requirementType: 'number',
	validateString: function (value, requirement) {
		var uppercase = value.match(/[A-Z]/g) || [];
		return uppercase.length >= requirement;
	},
	messages: {
		en: 'Your password must contain at least (%s) uppercase letter.'
	}
});

// login validation for lowercase
window.Parsley.addValidator('lowercase', {
	requirementType: 'number',
	validateString: function (value, requirement) {
		var lowercase = value.match(/[a-z]/g) || [];
		return lowercase.length >= requirement;
	},
	messages: {
		en: 'Your password must contain at least (%s) lowercase letter'
	}
});

// login validation for number
window.Parsley.addValidator('number', {
	requirementType: 'number',
	validateString: function (value, requirement) {
		var number = value.match(/[0-9]/g) || [];
		return number.length >= requirement;
	},
	messages: {
		en: 'Your password must contain	at least (%s) number'
	}
});

// login validation for special chars
window.Parsley.addValidator('special', {
	requirementType: 'number',
	validateString: function (value, requirement) {
		 var special = value.match(/[^a-zA-Z0-9]/g) || [];
		 return special.length >= requirement;
	},
	messages: {
		en: 'Your password must contain at least (%s) special characters'
	}
});
