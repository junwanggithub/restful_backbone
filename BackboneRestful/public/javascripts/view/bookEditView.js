define(['jquery',
	'underscore',
	'backbone',
	'lib/Backbone.ModelBinder'],
	function($, _, Backbone){
		return Backbone.View.extend({
			events: {
				'click #updateForm': "updateForm"
			},
			initialize: function(options){
				var self = this;

				self._parent = options.parent;
				self._modelBinder = new Backbone.ModelBinder();
				self._bookId = self._parent.model.get('bookId');
				self._book = self._parent.collection.get(self._bookId);

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


				$parentEl.empty().append('<h1>Edit book</h1>');
				for(var attr in attrs){
					if( attr === '_id'){
						$form.append('book id:' + attrs[attr] + '<br/>');
					}else{
						$form.append('<label>' + attr + ':' +
						 '<input name="' + attr + '" value="' +attrs[attr] + 
						 '"</label><br/>');
					}
				}
				$form.append('<input id="updateForm" type="submit" class="btn btn-primary" value="Submit">');
				self.$el.append($form);
				$parentEl.append(self.$el);
				self._modelBinder.bind(self._book,$form);
				$parentEl.append('<a href="/">Back to All books.</a>');
				return self;
			},
			updateForm: function(e){
				var self = this;
				e.preventDefault();
				console.dir(self._book);
				
				self._book.save(null, {
					dataType:"text",
					success: function(model, response){
						var model = self._parent.model,
						  router = model.get('router');
						console.log(response);
						router.writeUrl('book/'+ self._book.get('_id'));
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