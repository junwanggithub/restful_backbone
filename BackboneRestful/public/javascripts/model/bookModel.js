define(['backbone'],	function(Backbone){
	var Book = Backbone.Model.extend({
		defaults: {
    	'name': 'defaultname',
    	'author': 'defaultauthor',
    	'location': 'defaultlocation'
  	},
  	urlRoot: '/book',
		url: function() {
			return this.id ? this.urlRoot + '/' + this.id : this.urlRoot;
		},
		idAttribute: '_id'
	});

	return Book;
})