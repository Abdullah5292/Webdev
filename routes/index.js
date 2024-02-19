const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const authRouter = require("./auth");
const bookRouter = require("./book");

router.use("/auth", authRouter);


router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        const user = jwt.verify(token.split(" ")[1], "MY_SECRET")
        req.user = user;
        next()
    } catch (e) {
        return res.json({ msg: "TOKEN NOT FOUND / INVALID" })
        
    }
})





router.use("/books", bookRouter);

module.exports = router;