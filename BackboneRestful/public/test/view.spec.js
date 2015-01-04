var expect = chai.expect;

mocha.setup('bdd');

// Run tests on window load event.
window.onload = function(){
  (window.mochaPhantomJS || mocha).run();
};

describe('book view testing', function(){
	var self = this;
	before(function(){
		//create test fixture.
		self.$fixture = $('<div id="book-view-fixture"></div>');
	});

	beforeEach(function(done){
		self.$fixture.empty().appendTo($('#fixtures'));
		require(['backbone','model/booksCollection','model/bookModel', 'view/bookDetailsView'], 
			function(Backbone, BooksCollection, BookModel, BookDetailsView){
				var books = new BooksCollection(),
				  model = new Backbone.Model(),
				  parentModel = new Backbone.Model(),
				  parent;

        model.set('bookId', '');
				// parentModel.set('collection', books).set('model', model);
				parent = new Backbone.View({
					model: model,
					el: '#fixtures',
					collection: books
				});

				
				self.view = new BookDetailsView({
					el: self.$fixture,
					parent: parent
				});
				done();
		});

	});

	afterEach(function(){
		self.view.model.destroy();
	});

	after(function(){
		$('#fixtures').empty();
	});

	it('can render empty book', function(){
		expect(self.$fixture.html()).to.not.contain('name');
	});

	it('show books', function(done){
		var parent = self.view._parent,
		  collection = parent.collection,
		  book,
		  bookId;

		collection.fetch().done(function(){
			book = collection.at(0);
			bookId = book.get('_id');
			parent.model.set('bookId', bookId);
			self.view.render();

			expect(self.$fixture.html()).to.contain(book.get('name'));
			console.dir(book);
			done();
		});
		





		
	});
});