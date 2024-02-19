const bcrypt = require("bcrypt");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

router.post("/signUp", async (req, res) => {
    try {
        const { email, password } = req.body 

        let user = await Users.findOne({ email })
        if (user) return res.json({ msg: "USER EXISTS" })

        // Add password validation here
        if (password.length < 8) {
            return res.json({ msg: "PASSWORD TOO SHORT" })
        }

        // Check for special characters
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacters.test(password)) {
            return res.json({ msg: "PASSWORD MUST CONTAIN SPECIAL CHARACTER" });
        }

        // Check for uppercase characters
        const uppercaseCharacters = /[A-Z]/;
        if (!uppercaseCharacters.test(password)) {
            return res.json({ msg: "PASSWORD MUST CONTAIN UPPERCASE CHARACTER" });
        }

        await Users.create({ ...req.body, password: await bcrypt.hash(password, 5) });

        return res.json({ msg: "CREATED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email) return res.json({ msg: "USERNAME EMPTY" })

        const user = await Users.findOne({ email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" })

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            age: user.age,
            admin: user.admin,
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", token
        })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
