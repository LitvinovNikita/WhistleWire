import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*Register User*/

//the way this register function will work is that we're going to encrypt the password;
// we're going to save it and then when user tries to log in we're going to provide the password or they gonna provide the password
// Also, we'll make sure that they provided correct one and after that user will be provided with json web token
export const register = async(req, res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; // destructioring parameters from request body and send the object with those parameters


        // creating random salt provided by encription and then we gonna provide this salt to password encryption
        const salt = await bcrypt.genSalt(); 
        const passwordHash = await bcrypt.hash(password, salt);


        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })

        // if there is no error we send the user 201 status messagin that smth was created (and it will be showed up on a front-end)
        const saveduser = await newUser.save();
        res.status(201).json(saveduser);
    }catch(err){
        res.status(500).json({error: err.message}) // if there is an error, the front-end will get the message of the 500 code status(mongoDB gonna show us an error)
    }
}

/**Loggin in */
//from rec.body so we're grabbing the email and password when the user tries to log in
//we're going to use Mongoose to try to find the one that has the specified email and of course it has error message which will show the error if something went wrong (i.e didn't find the user with email)
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email})

        if(!user) return res.status(400).json({msg: "User does not exist"})

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});

    }catch(err){
        res.status(400).json({ error: err.message })
    }
}