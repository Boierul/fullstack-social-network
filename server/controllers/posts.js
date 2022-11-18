import Post from "../models/Post.js";
import User from "../models/User.js";

/* POST */
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        // After saving it into DB, this will return all the posts
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (err) {
        // Will return 409 (Conflict) as
        res.status(409).json({message: err.message});
    }
};


/* GET */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};


/* PATCH */
export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;

        const post = await Post.findById(id);
        // Because the used data structure in posts.likes is Map,
        // we can get the post likes without dor each iteration
        const isLiked = post.likes.get(userId);

        // Toggle like
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};
