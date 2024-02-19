const Users = require("../models/User");
const Movies = require("../models/Movie");
var express = require("express");
const Movie = require("../models/Movie");
var router = express.Router();

router.post("/getById", async (req, res) => {
    try {
        const Movie = await Movies.findOne({ Id: req.body.Id })
        if (!Movie) return res.json({ msg: "BOOK NOT FOUND" })
        res.json({ msg: "BOOK FOUND", data: book })
    } catch (error) {
        console.error(error)
    }
});

router.post("/getByIdWithUser", async (req, res) => {
    try {
        const Movie = await Movies.findOne({ Id: req.body.Id }).populate("user")
        if (!Movie) return res.json({ msg: "BOOK NOT FOUND" })
        res.json({ msg: "MOVIE FOUND", data: Movie })
    } catch (error) {
        console.error(error)
    }
});

/******* below are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "NOT ADMIN" })
    else next()
})

/******* below are all the routes that WILL pass through the middleware ********/

router.post("/addMovie", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const existingMovie = await Movies.findOne({ Id: req.body.Id })
        if (existingMovie) return res.json({ msg: "Id ALREADY EXISTS" })

        await Movies.create({ ...req.body, user: user._id })
        res.json({ msg: "BOOK ADDED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/deleteById", async (req, res) => {
    try {
        const Movie = await Movie.findOne({ Id: req.body.Id })
        if (!Movie) return res.json({ msg: "MOVIE NOT FOUND" })
        await Movies.deleteOne({ Id: req.body.Id })
        res.json({ msg: "MOVIE DELETED" })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
