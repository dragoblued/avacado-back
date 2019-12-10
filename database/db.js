const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({products: [], users: [], config: {
	"height": 156,
	"weight": 45,
	"gender": "w",	
	"age": 24,																																	
	"desiredResult": "+3"
}}).write();

module.exports = db;
