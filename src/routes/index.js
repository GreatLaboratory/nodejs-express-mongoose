const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.get('/getUsers', async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/createUser', async (req, res, next) => {
    const { name, age, married } = req.body;
    try {
        const newUser = new User({
            name : name,
            age : age,
            married : married,
        });
        const result = await newUser.save();

        return res.status(200).json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

//------------------------------------------------------------------------------------------------------------------------

router.get('/getComments', async (req, res, next) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/createComment', async (req, res, next) => {
    const { id, comment } = req.body;
    try {
        const newComment = new Comment({
            commenter : id,
            comment : comment
        });
        const result01 = await newComment.save();
        const result02 = Comment.populate(result01, { path : 'commenter' });

        return res.status(200).json(result02);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.put('/updateComment/:id', async (req, res, next) => {
    const id = req.params.id;
    const comment = req.body.comment;
    try {
        const result = await Comment.updateOne({
            _id : id
        }, {
            comment : comment
        });

        return res.status(200).json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/deleteComment/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Comment.deleteOne({
            _id : id
        });
        return res.status(200).json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
