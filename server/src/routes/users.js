const express = require('express');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const router = express.Router();
const {check, validationResult} = require('express-validator');


router.post("/register", [
    check("firstname", "Vui lòng không để trống").isString(),
    check("lastname", "Vui lòng không để trống").isString(),
    check("email", "Vui lòng không để trống").isEmail(),
    check ("password", "Mật khẩu phải chứa ít nhất 6 ký tự").isLength({
        min: 6,
    }),

], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if(user) {
            return res.status(400).json({message: "Tài khoản đã tồn tại "});

        }
        user = new User(req.body)
        await user.save();

        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY,
            {
                expiresIn : "1d"
            }
        );
        res.cookie("auth_token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        return res.status(200).send({message: " Đăng ký thành công "});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Something went wrong"});
    }
});

module.exports = router;