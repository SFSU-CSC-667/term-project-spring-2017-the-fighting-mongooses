var fs = require('fs'); //File sync.
var sql = fs.readFileSync('db_schema.sql').toString();
//var pgpString = 'postgres://vampiresnakes:blehssss@localhost:5432/advanceclones';

var db = require('../routes/database');

//Moved to /database route.
//const connectionString = process.env.DATABASE_URL || pgpString; 
//var db = pgp(connectionString);

//db.connect();
//Create tables in db.
db.query(sql);
//db.end();