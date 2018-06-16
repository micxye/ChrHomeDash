const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').load();
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

app.post('/localweather', (req, res) => {
    const clientIp = req.body.ip;
    axios.get(`http://api.ipstack.com/${clientIp}?access_key=${process.env.IPSTACK_API}`)
        .then(function (response) {
            const { latitude, longitude, city } = response.data;
            // send lat/long to server for weather 
            axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${latitude},${longitude}`)
                .then(function (response) {
                    res.send(Object.assign(response.data, {city}));
                })
                .catch(function (error) {
                    console.log(error);
                    res.send(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });

    
})

app.listen(port, () => console.log(`Server is listening to port ${port}`))