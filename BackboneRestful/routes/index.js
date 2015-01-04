var express = require('express');
var router = express.Router();

var db = require('../database/database.js');

/* GET books */
router.get('/books', function(req, res){
	db.books.find({},function(err, books){
		if(err) return;
		// var response = {
		// 	books: books
		// };                                                                                                                                                          
		res.json(books);
	});

});

/* GET home page. */
router.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

/* update */
router.put('/book/:bookId', function(req, res){	
	var book = req.body,
		bookId = book._id,
		str;

	delete book._id;
	str = JSON.stringify(book);
	console.log('bookId='+bookId);
	console.log(str);
	db.books.update({'_id': db.mongojs.ObjectId(bookId)}, {$set: book}, function(err, updated) {
	  if( err || !updated ){
	  	 console.log('Updating book err: ' + JSON.stringify( err));
	  }else{
  		console.log("Book updated");
  		// res.status('200').end();
  		res.status('200').send('updated');
  	} 

	});
});

/* create book and return _id */
router.post('/book', function(req, res){	
	var book = req.body;

	db.books.insert(book, function(err, inserted) {
	  if( err || !inserted ){
	  	 console.log('Inserting book err: ' + JSON.stringify( err));
	  }else{
  		console.log("Book inserted");
  		console.dir(inserted);
  		res.status('200').send({'_id': inserted._id});
  	} 

	});
});

/* delete book by _id */
router.delete('/book/:bookId', function(req, res){	
	var bookId = req.params.bookId;

	// var str = JSON.stringify(book);
	console.log('bookId='+bookId);

	db.books.remove({'_id': db.mongojs.ObjectId(bookId)}, function(err, removed) {
	  if( err || !removed ){
	  	 console.log('Removing book err: ' + JSON.stringify( err));
	  }else{
  		console.log("Book removed");
  		// res.status('200').end();
  		res.status('200').send('removed');
  	} 

	});
});

/* remove all */
router.get('/clear/:callback', function(req, res){
  db.books.remove({},function(err, books){
		if(err) return;
		if(req.params.callback === 'define'){
			res.status('200').send('define({books:{}});');	
		}else{
			res.json({books:{}});
		}
	});
});

// router.get('/test/index-test.html', function(req, res){
//   res.render('test/index-test');
// });

module.exports = router;
