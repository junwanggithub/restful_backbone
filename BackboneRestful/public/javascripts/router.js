define([
	'backbone'],
	function(
		Backbone, 
		Events){
	var Router = Backbone.Router.extend({
		initialize: function(options){
			var self = this;

			self.name = {};
			self._view = options.view;
			self._view.model.set('router', self);
		},

		routes: {
			'': 'index',
			'book/:id': 'singleBook',
			'edit/:id': 'editBook',
			'delete/:id': 'deleteBook',
			'add': 'addBook'			
		},		
		index: function(){
			this._view.model.set('currentView','booksView');
		},
		singleBook: function(id){
			this._view.model.set('bookId',id);
			this._view.model.set('currentView','bookDetailsView');
		},
		editBook: function(id){
			this._view.model.set('bookId',id);
			this._view.model.set('currentView','bookEditView');
		},
		addBook: function(){
			this._view.model.unset('bookId');
			this._view.model.set('currentView','bookAddView');
		},
		deleteBook: function(id){
			this._view.model.set('bookId',id);
			this._view.model.set('currentView','bookDeletView');
		},
		writeUrl: function( fragment ){
      this.navigate( fragment, {trigger: true, replace: true} );
    }

		
	});
	return Router;
})