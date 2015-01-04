define(['jquery','backbone'],
	function($,Backbone){
		return Backbone.View.extend({
			initialize: function(options){
				var self = this;

				self._parent = options.parent;
				self.collection = self._parent.collection;
				self.render();
			},
			render: function(){
				var self = this,
					books = self.collection.models,
					$booksUl = $('<ul class="books" ></books>'),
					$bookLi,
					$link,
					bookName,
					bookIndex,
					bookId;

				_.each( books, function(item, index){
					bookIndex = index+1;
					bookName = item.get('name');
					bookId = item.id;
					$link = $('<a/>').html(bookIndex + ' '+ bookName)
									.attr('href','#book/'+ bookId);
					$bookLi = $('<li/>').append($link);					
					$booksUl.append($bookLi);
				})

				self._parent.$el.empty()
				.append('<h1>All books in library:</h1>')
				.append($booksUl)
				.append('<a href="#add" class="btn btn-primary">Add</a>');
				return self;
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