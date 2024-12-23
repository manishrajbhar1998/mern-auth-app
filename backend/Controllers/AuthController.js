const { required } = require("joi");
const UserModel = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req,res) =>{
    try{

        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message:"User is already exist, you can login",success:false})
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({message:"Singup successfully",success:true})
    }catch(err){
        res.status(500).json({message:"Internal server error",success:false})
    }
}

const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        console.log(req.body);
        const user = await UserModel.findOne({email});
        console.log("user ::",user)
        const errorMsg = "Auth failed email or Password is wrong";
        if(!user){
            return res.status(403).json({message:errorMsg,success:false});
        }

        const isPassEqual = await bcrypt.compare(password,user.password);
        console.log("isPassEqual :: ", isPassEqual)

        if(!isPassEqual){
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        console.log("jwtToken :: ", jwtToken);

        res.status(200).json({
            message:"Login Success",
            success:true,
            jwtToken,
            email,
            name:user.name
        })

    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false })

    }
}

module.exports = {
    signup,
    login
}