define([
	'backbone',
  'router',
  'view/appView',
  'model/booksCollection'], 
  function(
  	Backbone,
  	Router,
  	AppView,
  	BooksCollection){
	var App = {};
	App.start = function(){
		var booksCollection,
			appView;


		booksCollection = new BooksCollection();		
		appView = new AppView({collection: booksCollection, model:new Backbone.Model({'viewName':'booksView'})});		
		Router = new Router({view: appView}) ;


		Backbone.history.start();
	}

	return App;

});