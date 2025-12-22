import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
    try{
        const token = req.headers.token;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(401).json({message: "User not found"});
        }

        req.user = user;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message: error.message});
    }
}

