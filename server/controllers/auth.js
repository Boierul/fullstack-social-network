import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register the user */
// Must be async - will be calling mongoDB
export const register = async (req, res) => {
    console.log(req.body)
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        // Generate a salt for the password
        const salt = await bcrypt.genSalt();
        // Fetch the generated hashed password
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new User
        // viewedProfile && impressions generated with dummy data for simplicity's sake
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 100)
        });

        // Will save the user in the DB
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

/* Logging the user */
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if (!user) return res.status(400).json({msg: "User does not exist"});

        // Compare if the hash values of the passwords are matching
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});

        // JWT - will generate a sessionToken for the user
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        // Delete password to not return it to the frontend
        delete user.password;

        // Return the sessionToken and the user (without pass field)
        res.status(200).json({token, user});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
