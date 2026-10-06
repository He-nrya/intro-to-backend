import {User} from "../models/user.model.js";

const registerUser = async (req, res) => {
    try{
        const {username, password, email} = req.body;
        // Validate the input data
        if(!username || !password || !email) {
            return res.status(400).json({message: "All fields are required"});
        }

        // Check if the user already exists

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if(existingUser) {
            return res.status(400).json({message: "User already exists!"});
        }
        // create user
        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {id: user._id, email: user.email, username: user.username }
        });
    }catch(error) {
        return res.status(500).json({message: "Error registering user",error:error.message });
    }
};

const loginUser = async (req, res) => {
    try{


        //checking if the user exists
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "User not found!"
        });

        // compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "User logged in successfully",
            user: {id: user._id,
                 email: user.email, 
                 username: user.username }
        })


        
    }catch(error) {
        res.status(500).json({
            message: "Internal server error"
        })

    }
}
const logoutUser = async (req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({
           email 
        });
        
        if(!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "logout successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        });

    }
}
export {
  registerUser,
  loginUser,
  logoutUser
};