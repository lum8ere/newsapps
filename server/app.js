const express = require('express')
const config = require('config')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');




const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))

const PORT = config.get('port') || 8000

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to MongoDB')
        app.listen(PORT, () =>
            console.log(`Server has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
    }
}

start()