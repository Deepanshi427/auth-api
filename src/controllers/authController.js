const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = async ( req , res)=>{
    const { name , email, password} = req.body;
    if(!name || !email|| !password){
        return res.status(400).json({error: " All fields are required"});
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:" User already exists"});

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name, 
            email,
            password: hashedPassword 
        });

        await user.save();
        res.status(201).json({message:" User registered successfully"});
    }catch (error){
        console.error(error);
        res.status(500).json({error: "server error"});
    }
};