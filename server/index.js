const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

app.use(cors());
app.use(bodyParser.json());

const path = require('path');
const port = 8888;

app.use(express.static(path.join(__dirname, '/../client/dist')));

var toDos = [];

app.get('/toDoList', (req, res)=>{
    res.send(toDos);
})

app.get('/todo', (req, res) => {
    db.getToDos((err, data) => {
        if (err) {
            res.sendStatus(404);
            res.send(error);
        } else {
            res.send(data);
        }
    })
})

app.post('/todo', (req, res) => {
    db.addToDo(req.body, (err, data) => {
        if (err) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
})

app.listen(port, () => console.log(`Server is listening to port ${port}`))