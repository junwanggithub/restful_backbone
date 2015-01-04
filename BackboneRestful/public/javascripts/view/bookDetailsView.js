define(['jquery','backbone'],
	function($,Backbone){
		return Backbone.View.extend({
			events: {
				'click .deleteBook': 'deleteBookPopup'
			},
			initialize: function(options){
				var self = this;

				self._parent = options.parent;
				self.collection = self._parent.collection;
				self.model = self._parent.model;
				self.render();
			},
			render: function(){
				var self = this,
					bookId = self.model.get('bookId'),
					book = self.collection.get(bookId),
					$detailsUl = $('<ul class="bookDetails" ></books>'),
					$detailsLi,
					$link,
					// bookName=book.get('name'),
					bookIndex,
					attrs = book ? book.attributes || {} : {},
					$parentEl = self._parent.$el,
					$el = self.$el;

				$el.append('<h1>View book details</h1>');
				for(var attr in attrs){
					$el.append(attr + ':' + attrs[attr] + '<br/>');
				}

				$el.append('<a href="#edit/' + bookId + '" class="btn btn-primary">Edit</a><br/>');
				$el.append('<a class="deleteBook btn btn-primary" href="/' + bookId + '">Delete</a><br/>');
				$el.append('<a href="/">Back to All books</a>');
				$parentEl.empty();
				$parentEl.append($el);
				return self;
			},
			deleteBookPopup: function(e){		
				e.preventDefault();		
				var result = confirm('You want to remove this book?'),
				  self = this,
					bookId = self.model.get('bookId'),
					book = self.collection.get(bookId);

				if(result === true){
					book.destroy({
						dataType:"text",
						success: function(model, response){
							alert(response);
							location.href = '/';
						}
					});
				}
			},
			onShow: function(){
				this.$el.show(500);
			},
			close: function(){
				this.remove();
				this.unbind();
			}

		});
});