var expect = chai.expect;

mocha.setup('bdd');

window.onload = function(){
	(window.mochaPhantomJS || mocha).run();
};

// describe('spy testing',function(){
// 	it('anonymous spy', function(){
// 		var eventer = _.extend({}, Backbone.Events),
// 			spy = sinon.spy();

// 		eventer.on('foo', spy);
// 		expect(spy.called).to.be.false;

// 		eventer.trigger('foo', 42);
// 		expect(spy.calledOnce).to.be.true;
// 		expect(spy.callCount).to.equal(1);

// 		expect(spy.firstCall.args[0]).to.equal(42);
// 		expect(spy.calledWith(42)).to.be.true;
// 	});
// });

describe('view update testing with stub', function(){
	var xhr, requests, self = this;
	before(function(){
		
	});

	after(function(){
		// self.appView.remove();
	});

	//This is failed because render binding to model change happened after async booksCollection.fetch in appView.initialize function
	it('books view render testing', function(done){
		require(['view/appView', 'model/booksCollection'], function(AppView, BooksCollection){
			var booksCollection = new BooksCollection(),
			  appView;

			booksCollection.fetch().done(function(){
				appView = new AppView({collection: booksCollection, model:new Backbone.Model({'viewName':'booksView'})});
				sinon.stub(appView, 'render');
				appView.model.trigger('change');
				expect(appView.render).to.have.been.calledOnce;
				done();
			});
			   
		});
		

	});
});

