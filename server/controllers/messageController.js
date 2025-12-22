import Message from "../models/Message"
import User from "../models/User"
import cloudinary from "../lib/cloudinary.js"
import { io, userSocketMap } from "../server.js"

// Get All users except the logged in user
export const getUserForSidebar = async (req, res)=>{
    try{
        const userId = req.user._id
        const filterUsers = await User.find({
            _id: {
                $ne: userId
            }
        }).select("-password")

        //count the number of messages not seen
        const unseenMessages = {}
        const promise = filterUsers.map(async (user) =>{
            const message = await Message.find({
                senderId: user._id,
                receiverId: userId,
                seen:false
            })

            if(message.lenght >0) {
                unseenMessages[user._id] = message.length;
            }
        })

        await Promise.all(promise);
        res.json({success: true, users: filterUsers, unseenMessages})

    }catch(error){
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}

// get all messages from selected User
export const getMessages = async(req, res) =>{
    try{
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId:myId}
            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen:true})
        res.json({success:true, messages})

    }catch(error){
        console.log(error.message)
        res.status(500).json({ success: false, message: error.message });
    }
}


//api to mark message as seen using message id
export const markMessageAsSeen =  async(req, res) =>{
    try{
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen:true})
        res.json({success: true})

    }catch(error){
        console.log(error.message)
        res.status(500).json({ success: false, message: error.message });
    }
}

//Send message to selected User
export const sendMessage = async(req, res) =>{
    try{

        const {text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl= uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        // emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({success: true, newMessage})

        
    }catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}