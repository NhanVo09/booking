const  mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserType ={
    _id: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
};

const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true  },
    firstname: { type: String, require: true  },
    lastname: { type: String, require: true  },
});

userSchema.pre("save", async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;