const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('../models/model.js')

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/add', function (req, res) {
    db._insert('users', {
        'username': req.body.user,
        'password': req.body.pswd
    }).then((info) => {
        var response = req.body;
        console.log(info.insertId)
        res.send(response)
    }).catch((err) => {
        console.log(err)
    })
})

app.post('/fetch', (req, res) => {
    if (typeof req.body.id != 'undefined') {
        var UserId = { id: req.body.id };
    } else {
        useId = {};
    }
    db._select('users', ['id', 'username', 'password'], UserId).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err)
    })
})

app.post('/delete', (req, res) => {
    console.log(req.body)
    db._delete('users', { id: req.body.userId }).then((param) => {
        res.json({
            msg: 'recored deleted',
            responseId: req.body.userId
        })
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = app
