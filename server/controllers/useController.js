import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js";


//TODO: Where are cookies? 


//signUp a new user
export const signUp = async(req, res) =>{
    try {

        const {fullName, email, password, bio} = req.body;

        if(!fullName || !email || !password || !bio){
            return res.status(400).json({message: "All fields are required"})
        }
        
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

        res.json({
            success: true,
            userData : newUser,
            token,
            message: "User created successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

// login an existing user
export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"})
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            userData : user,
            token,
            message: "User logged in successfully"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const checkAuth = (req, res) =>{
    res.json({success: true, user: req.user}); 
}

export const updateProfile = async(req, res) =>{
    try{

        const {profilePic, bio} = req.body;

        const userId = req.user._id;

        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio}, {new: true});
        }else{
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, {bio, profilePic: uploadResponse.secure_url}, {new: true});
        }

        res.json({success: true, user: updatedUser, message: "Profile updated successfully"});

    }catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}