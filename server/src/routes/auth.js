const express = require('express');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const {check, validationResult} = require('express-validator');

router.post("/login", [
    check ("email", "Email không đúng").isEmail(),
    check ("password", "Mật khẩu phải chứa ít nhất 6 ký tự").isLength({
        min: 6,
    }),
], async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }

    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: "Không hợp lệ vui lòng nhập lại"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!user){
            return res.status(400).json({message: "Không hợp lệ vui lòng nhập lại"})
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY,{
            expiresIn : "1d",
        });

        res.cookie("auth_token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        res.status(200).json({userId: user.id})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}
);
module.exports = router;