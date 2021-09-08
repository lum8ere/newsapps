const { Router } = require('express')
const mongoose = require('mongoose')
const router = Router()

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})


const Comments = mongoose.model('Comments', CommentSchema)

router.get('/', (req, res) => {
    Comments.find(req.query)
        .then((comment) => res.send(comment))
        .catch((err) => res.send(err))
})

router.post("/create", (req, res) => {
    Comments.create(req.body)
        .then(comment => {
            res.send(comment);
        });
});

router.put("/put", (req, res) => {
    Comments.findByIdAndUpdate({ id: req.query["id"] }, req.body)
        .then(() => {
            Comments.findOne({ id: req.query["id"] })
                .then(comment => {
                    res.send(comment);
                });
        });
});

router.delete("/delete", (req, res) => {
    Comments.deleteOne({ id: req.query["id"] })
        .then(comment => {
            res.send(comment);
        });
});

module.exports = router