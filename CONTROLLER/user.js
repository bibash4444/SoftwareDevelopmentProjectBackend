const bcrypt = require("bcrypt");
const user = require("../MODELS/user");
const jwt = require("jsonwebtoken");
const e = require("express");
require("dotenv").config();

module.exports = {

    async login(req, res) {
        let userData = user.findOne({ where: { email: req.body.email } })
        if (userData) {
            if (await bcrypt.compare(req.body.password, userData.password)) {
                const token = jwt.sign({ email: userData.email, id: userData._id }, process.env.SECRET_KEY_FOR_TOKEN, { expiresIn: "7d" })
                res.status(200).json({
                    success: true,
                    msg: 'Login success',
                    token: token
                })
            } else {
                res.status(200).json({
                    success: false,
                    msg: 'Invalid creditianls'
                })
            }
        } else {
            res.status(200).json({
                success: false,
                msg: 'User doesnot exist or invalid creditianls'
            })
        }
    },

    async register(req, res) {
        try {
            let userExist = await user.findOne({ email: req.body.email })
            if (userExist) {
                res.status(200).json({
                    success: false,
                    msg: 'Email already in use, please choose a different one'
                })
            } else {

                saltRounds = 10
                bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
                    user.create({
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        phonenumber: req.body.phonenumber,
                        password: hashedPassword,
                    }).then(user => {
                        res.status(200).json({
                            success: true,
                            msg: 'Account created successfully'
                        })
                    })
                })
            }
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
}