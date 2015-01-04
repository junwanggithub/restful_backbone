define(['backbone',
	'view/booksView',
	'view/bookDetailsView',
	'view/bookEditView',
	'view/bookAddView'
	],
	function(Backbone,
		BooksView,
		BookDetailsView,
		BookEditView,
		BookAddView){		
		var appView = Backbone.View.extend({
			el: '.app',
			initialize: function(options){
				var self = this,
				booksCollection = self.collection,
				model = self.model;				

				console.dir(booksCollection);
				booksCollection.fetch().done(function(){					
					self.listenTo(model,'change',self.render);
					self.render();
				});
			},
			events: {
				'click .book-detail': '_bookDetailsHandler'
			},
			render: function(){
				// console.log('appView render triggered.');
				var self = this,
					viewName = self.model.get('currentView');

				switch(viewName){
					case 'booksView':
						self._showBooks();
						break;
					case 'bookDetailsView':
						self._showBookDetails();
						break;
				  case 'bookEditView':
						self._bookEdit();
						break;
				  case 'bookAddView':
						self._bookAdd();
						break;
					default:
						alert('default');

				}


			},

			_showBooks: function(){
				var self = this;
				self._viewManager.show(new BooksView({parent:self}));				
			},
			_showBookDetails: function(){
				var self = this;
				self._viewManager.show(new BookDetailsView({parent:self}));
			},
			_bookEdit: function(){
				var self = this;
				self._viewManager.show(new BookEditView({parent:self}));
			},
			_bookAdd: function(){
				var self = this;
				self._viewManager.show(new BookAddView({parent:self}));
			},
			_viewManager: (function(){
				var currentView,
				managerObj = {};

				var closeView = function(view){
					if(view && view.close)view.close();
				};

				var openView = function(view){
					if(view.onShow)view.onShow();
				};

				managerObj.show = function(view){
					closeView(currentView);
					currentView = view;
					openView(currentView);
				}
				return managerObj;
			})()

			});
		return appView;

	})