const mongoose = require('mongoose');
require('dotenv').load();

const mongoDB = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ds045097.mlab.com:45097/homedash`;
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('connected to mongo!!!');
});
