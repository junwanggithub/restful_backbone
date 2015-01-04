define(['underscore',
	'backbone',
	'model/bookModel'],
	function(_, 
		Backbone,
		BookModel){
	return Backbone.Collection.extend({
		url: '/books',
		model:BookModel,
		parse: function(response){			
			return response;
		}
	});
});