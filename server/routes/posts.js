const { Router } = require('express')
const mongoose = require('mongoose')
const router = Router()

const PostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})


const Posts = mongoose.model('Posts', PostSchema)

router.get('/', (req, res) => {
    Posts.find()
        .then((posts) => res.send(posts))
        .catch((err) => res.send(err))
}) 

module.exports = router