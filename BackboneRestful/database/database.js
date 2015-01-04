var dbUrl = 'library';
var collection = ['books'];
var mongojs = require('mongojs');
var db = mongojs.connect(dbUrl,collection);
db.mongojs = mongojs;

module.exports = db;
