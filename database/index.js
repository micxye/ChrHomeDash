const mongoose = require('mongoose');
require('dotenv').load();

const mongoDB = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ds045097.mlab.com:45097/homedash`;
mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('connected to mongo!!!');
});

const userSchema = new mongoose.Schema({
    name: String,
    tasks: [{ id: String, text: String, complete: Boolean }],
    following: [String]
});

const Setting = mongoose.model('Setting', userSchema, 'mic');

const getSettings = callback => Setting.find({ name: 'mic' }).exec(callback);

const saveTasks = (tasks, callback) => Setting.findOneAndUpdate({ name: 'mic' }, { tasks }, callback);

const saveFollowing = (following, callback) => Setting.findOneAndUpdate({ name: 'mic' }, { following }, callback);

module.exports = { db, getSettings, saveTasks, saveFollowing }
