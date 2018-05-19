const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/newTabDB';
mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('connected to mongo!!!');
});



