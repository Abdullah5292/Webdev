const Users = require('../models/User');
const Movies = require('../models/Movie');

var express = require('express');
var router = express.Router();

router.get('/getById', async (req, res) => {
    try {
        const movie = await Movies.findOne({ id
            : req.body.id });
        if (!movie) return res.json({ msg: 'MOVIE NOT FOUND' });
        res.json({ msg: 'MOVIE FOUND', data: movie });
    } catch (error) {
        console.log(error);
    }
});

router.get('/getByIdWithUser', async (req, res) => {
    try {
        const movie = await Movies.findOne({ id
            : req.body.id }).populate('user');
        if (!movie) return res.json({ msg: 'MOVIE NOT FOUND' });
        res.json({ msg: 'MOVIE FOUND', data: movie });
    } catch (error) {
        console.error(error);
    }
});

/******* below are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: 'NOT ADMIN' });
    else next();
});

/******* below are all the routes that WILL pass through the
 * middleware ********/

router.post('/addMovie', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        
        const existingMovie = await Movies.findOne({ title : req.body.id });
        if (existingMovie) return res.json({ msg: 'ID ALREADY EXISTS' });
        
        await Movies.create({ ...req.body, user: user._id });
        res.json({ msg: 'MOVIE ADDED' });
    } catch (error) {
        console.error(error);
    }
});    

router.delete('/deleteById', async (req, res) => {
    try {
        const movie = await Movies.findOne({ id
            : req.body.id });
        if (!movie) return res.json({ msg: 'MOVIE NOT FOUND' });
        await Movies.deleteOne({ id
            : req.body.id });
        res.json({ msg: 'MOVIE DELETED' });
    } catch (error) {
        console.error(error);
    }
});

router.put('/updateById', async (req, res) => {
    try {
        const movie = await Movies.findOne({ id
            : req.body.id });
        
        if (!movie) return res.json({ msg: 'MOVIE NOT FOUND' });
        await Movies.updateOne({ id
            : req.body.id }, { ...req.body });
        res.json({ msg: 'MOVIE UPDATED' });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;
