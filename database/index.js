const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/newTabDB';
mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('connected to mongo!!!');
});

const toDoSchema = new mongoose.Schema({
    thing: String,
    complete: Boolean,

})

const ToDo = mongoose.model('todo', toDoSchema);

const addToDo = (data, callback) => {
    const toDo = {
        thing: data.thing,
        complete: false
    }
    ToDo.insert(toDo);
}

module.exports = {
    db,
    ToDo,
    addToDo
}