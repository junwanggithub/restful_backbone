var expect = chai.expect;

mocha.setup('bdd');

// Run tests on window load event.
window.onload = function () {
  (window.mochaPhantomJS || mocha).run();
};


    

describe('bookModel test', function () {
  it('has default values', function(done){
    require(['model/bookModel'],function(BookModel){
      //create empty book model.
      var book = new BookModel();
      expect(book).to.be.ok;
      expect(book.get('name')).to.equal('defaultname');
      expect(book.get('author')).to.equal('defaultauthor');
      expect(book.get('location')).to.equal('defaultlocation');
      done();
    });
  });

  it('set passed attributes', function(done){
    require(['model/bookModel'],function(BookModel){      
      var book = new BookModel({
        'name': 'name1',
        'author': 'author1',
        'location': 'location1'
      });
      expect(book.get('name')).to.equal('name1');
      expect(book.get('author')).to.equal('author1');
      expect(book.get('location')).to.equal('location1');
      done();
    });
  })
  
});

describe('booksCollection testing', function(){    
  var self = this;
  before(function(done){    
    require(['model/booksCollection','/clear/define'], function(BooksCollection,resBooks){
      console.dir(resBooks);
      self.books = new BooksCollection();
      done();
    });
  });

  after(function(){
    self.books = null;
  });

  describe('creation', function(){
    it('has default values', function(){
      console.dir(self.books);
      expect(self.books).to.be.ok;
      expect(self.books).to.have.length(0);
    });
  });
      
  describe('modification', function(){
    beforeEach(function(){
      self.books.create({
        name: 'name1',
        author: 'author1',
        location: 'location1'
      });
    });

    afterEach(function(done){
      require(['/clear/define'], function(resBooks){
        console.dir(resBooks);
        self.books.reset();
        done();
      });
    });

    it('has single book', function(done){
      var books = self.books,
        book;

      // will be triggered after fetch below
      books.once('reset', function(){
        expect(books).to.have.length(1);
        book = books.at(0);
        expect(book).to.be.ok;
        expect(book.get('name')).to.equal('name1'); 
        done();
      });

      books.fetch({ reset: true });
      
    });

    it('can remove one book', function(done){
      var books = self.books,
        book;

      book = books.shift();
      //trigger by shift below
      book.once('destroy', function(){
        expect(books).to.have.length(0);
        done();
      });

      book.destroy();
      expect(book).to.be.ok;
    });
  });
   
});

describe('bookDetailsView testing', function(){

});

