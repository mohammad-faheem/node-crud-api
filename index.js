const express = require('express')
const app = express()
const user = require('./controllers/user')

const port = process.env.PORT || 8000;

app.use('/user', user)

app.listen(port, () => {
    console.log('server is running on port: ' + port)
})
