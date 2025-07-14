const userModel = require("../models/user.model")

const userControls = {
    register : async(req, res) => {
        try {
            const {name, email, password} = req.body;
            const user = await userModel.findOne({email})
            if(user) 
                return res.status(400).json({status : false, msg : "Email already exist"})
            
            if(password.length < 6) 
                return res.status(400).json({status : false, msg : "Password must be greater than 6 characters"})

            const newUser = new userModel({name, email, password})
            await newUser.save()
            res.status(200).json({status : true, msg : "Registration successful"})
        } catch (err) {
            res.status(500).json({status: false, msg : err.message})
        }
    }
}

module.exports = userControls;