const bcrypt = require("bcrypt");
const user = require("../MODELS/user");
const googleuser = require('../MODELS/googleuser')
const jwt = require("jsonwebtoken");
const e = require("express");
const { json } = require("body-parser");
require("dotenv").config();

module.exports = {
    async login(req, res) {
        let userData = await user.findOne({ email: req.body.email });

        if (userData) {
            if (await bcrypt.compare(req.body.password, userData.password)) {
                const token = jwt.sign({ email: userData.email, id: userData._id },
                    process.env.SECRET_KEY_FOR_TOKEN, { expiresIn: "7d" }
                );

                userData.password = null;
                res.status(200).json({
                    success: true,
                    msg: "Login success",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    success: false,
                    msg: "Invalid creditianls",
                });
            }
        } else {
            res.status(200).json({
                success: false,
                msg: "User doesnot exist or invalid creditianls",
            });
        }
    },

    async register(req, res) {
        try {
            let userExist = await user.findOne({ email: req.body.email });
            if (userExist) {
                res.status(200).json({
                    success: false,
                    msg: "Email already in use, please choose a different one",
                });
            } else {
                saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
                    user
                        .create({
                            fname: req.body.fname,
                            lname: req.body.lname,
                            email: req.body.email,
                            phonenumber: req.body.phonenumber,
                            password: hashedPassword,
                        })
                        .then((user) => {
                            res.status(200).json({
                                success: true,
                                msg: "Account created successfully",
                            });
                        });
                });
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                msg: JSON.stringify(e)
            })
        }
    },

    async loginGoogleUser(req, res) {
        try {
            googleuser.findOneAndUpdate({ googleId: req.body.googleId }, {
                fname: req.body.givenName,
                lname: req.body.familyName,
                email: req.body.email,
                googleId: req.body.googleId,
                imageUrl: req.body.imageUrl
            }, { upsert: true }).then((data) => {
                res.status(200).json({
                    success: true,
                    msg: 'Login Success'
                })
            }).catch((e) => {
                res.status(200).json({
                    success: false,
                    msg: `Login failed ${JSON.stringify(e)}`
                })
            })

        } catch (e) {
            res.status(500).json({
                success: false,
                msg: JSON.stringify(e)
            })
        }
    }
};