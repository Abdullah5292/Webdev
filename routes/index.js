const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const authRouter = require("./auth");
const bookRouter = require("./book");
const movieRouter = require("./movie");


router.use("/auth", authRouter);


router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        const user = jwt.verify(token.split(" ")[1], "MY_SECRET")
        console.log(user);
        req.user = user;
        next()
    } catch (e) {
        return res.json({ msg: "TOKEN NOT FOUND / INVALID" })
        
    }
})





router.use("/book", bookRouter);
router.use("/movie", movieRouter);

module.exports = router;