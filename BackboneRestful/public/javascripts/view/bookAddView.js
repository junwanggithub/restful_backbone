define(['jquery',
	'underscore',
	'backbone',
	'model/bookModel',
	'lib/Backbone.ModelBinder'],
	function($, _, Backbone, BookModel){
		return Backbone.View.extend({
			events: {
				'click #addBook': "addBook"
			},
			initialize: function(options){
				var self = this;

				self._parent = options.parent;
				self._modelBinder = new Backbone.ModelBinder();
				// self._bookId = self._parent.model.get('bookId');
				self._book = new BookModel();

				self.render();
			},
			render: function(){
				var self = this,
					$detailsUl = $('<ul class="bookDetails" ></books>'),
					$detailsLi,
					$link,
					attrs = self._book.attributes,
					$parentEl = self._parent.$el,
					$form = $('<form/>');


				$parentEl.empty().append('<h1>Add book</h1>');
				for(var attr in attrs){
					$form.append('<label>' + attr + ':' +
						 '<input name="' + attr + '" value="' +attrs[attr] + 
						 '"</label><br/>');
					
				}
				$form.append('<input id="addBook" type="submit" value="Add" class="btn btn-primary">');
				self.$el.append($form);
				$parentEl.append(self.$el);
				self._modelBinder.bind(self._book,$form);
				$parentEl.append('<a href="/">Back to All books.</a>');
				return self;
			},
			addBook: function(e){
				var self = this;
				e.preventDefault();
				console.dir(self._book);
				
				self._book.save(null, {
					dataType:"json",
					success: function(model, response){
						var model = self._parent.model,
						  router = model.get('router');
						console.log(response);
						self._book.set( '_id', response._id);
						self._parent.collection.add(self._book);
						self._parent.model.get('router').writeUrl('/');
					}
				});
				
			},
			onShow: function(){
				this.$el.show(500);
			},
			close: function(){
				this._modelBinder.unbind();
				this.remove();
				this.unbind();

			}

		});
});