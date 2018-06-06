const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const db = require('../database/index.js');

app.use(cors());
app.use(bodyParser.json());

const path = require('path');
const port = 8888;

app.use(express.static(path.join(__dirname, '/../client/dist')));

var toDoList = [{
    id: 1,
    text: 'server has been reset!',
    complete: false
}];

app.get('/todolist', (req, res) => {
    res.send(toDoList);
})

app.post('/todolist', (req, res) => {
    toDoList = req.body;
    res.send('list updated in server')
    console.log(toDoList)
})

app.listen(port, () => console.log(`Server is listening to port ${port}`))