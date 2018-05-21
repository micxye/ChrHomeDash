const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/newTabDB';
mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('connected to mongo!!!');
});

const toDoSchema = new mongoose.Schema({
    id: {
        type: String,
        index: true,
        unique: true,
    },
    thing: String,
    complete: Boolean,
})

const ToDo = mongoose.model('todo', toDoSchema);

const addToDo = (data, callback) => {
    const toDo = {
        id: data.id,
        thing: data.thing,
        complete: false
    }
    ToDo.insert(toDo, (err, suc) => {
        if (err) {
            console.log("error inserting to db", err);
        } else {
            console.log("added toDo");
        }
    });
}

const getToDos = (callback) => {
    ToDo.find((err, toDos) => {
        if (err) {
            console.error(err);
        } else {
            callback(toDos);
        }
    })
}

module.exports = {
    db,
    ToDo,
    addToDo,
    getToDos,
}