import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exists = await userModel.findOne({ email });
        if (!exists) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, exists.password);
        if (isMatch) {
            const token = createToken(exists._id);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}


//Route for user register

const registerUser = async (req,res) =>{
   try{
     const {name,email,password} = req.body;

     // check if user is already registered
     const exists = await userModel.findOne({email});
     if(exists) {
        return res.json({success:false,message:"User already registered"});
     }

     //validating email format & strong password
     if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email"});
     }
     if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"});
     }

     //hashing password
     // Adjustable for security vs. performance
    const hashedPassword = await bcrypt.hash(password, 10);// Pass only the number of rounds
    

     const newUser= new userModel({
        name,
        email,
        password: hashedPassword
     })

     const user = await newUser.save()
     const token = createToken(user._id)
     res.json({success:true,token})
   }
   catch(error){
    console.log(error);
     return res.status(400).json({message:error.message})
   }

}

//Route for admin login
const adminLogin = async (req,res) =>{
    try {

        const {email,password} = req.body;
        
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD ){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
     return res.status(400).json({message:error.message})
    }
}

export {registerUser,loginUser,adminLogin}