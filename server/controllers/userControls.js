const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const cookieParser = require("cookie-parser");



const userControls = {
    register : async(req, res) => {
        try {
            const {name, email, password} = req.body;
            const user = await userModel.findOne({email})
            if(user) 
                return res.status(400).json({status : false, msg : "Email already exist"})
            
            if(password.length < 6) 
                return res.status(400).json({status : false, msg : "Password must be greater than 6 characters"})

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new userModel({name, email, password : hashedPassword})
            await newUser.save()

            const accessToken = createAccessToken({id : newUser._id})
            const refreshToken = createRefreshToken({id : newUser._id})

            // const accessToken = jwt.sign({id: newUser._id}, process.env.ACCESS_SECRET_KEY, {expiresIn : '1d'})
            res.cookie("refreshToken", refreshToken, {
                httpOnly : true,
                path : "/user/refreshtoken"
            })
            

            res.status(200).json({status : true, msg : "Registration successful", accessToken})
        } catch (err) {
            res.status(500).json({status: false, msg : err.message})
        }
    },
    refreshtoken : (req, res) => {
        
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn : '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn : '7d'})
}

module.exports = userControls;