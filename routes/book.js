const Users = require("../models/User");
const Books = require("../models/Book");
var express = require("express");
var router = express.Router();

router.post("/getByIsbn", async (req, res) => {
    try {
        const book = await Books.findOne({ isbn: req.body.isbn })
        if (!book) return res.json({ msg: "BOOK NOT FOUND" })
        res.json({ msg: "BOOK FOUND", data: book })
    } catch (error) {
        console.error(error)
    }
});

router.post("/getByIsbnWithUser", async (req, res) => {
    try {
        const book = await Books.findOne({ isbn: req.body.isbn }).populate("user")
        if (!book) return res.json({ msg: "BOOK NOT FOUND" })
        res.json({ msg: "BOOK FOUND", data: book })
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

router.post("/addBook", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const existingBook = await Books.findOne({ isbn: req.body.isbn })
        if (existingBook) return res.json({ msg: "ISBN ALREADY EXISTS" })

        await Books.create({ ...req.body, user: user._id })
        res.json({ msg: "BOOK ADDED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/deleteByIsbn", async (req, res) => {
    try {
        const book = await Books.findOne({ isbn: req.body.isbn })
        if (!book) return res.json({ msg: "BOOK NOT FOUND" })
        await Books.deleteOne({ isbn: req.body.isbn })
        res.json({ msg: "BOOK DELETED" })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
