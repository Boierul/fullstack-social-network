import mongoose from "mongoose";

// at likes -> Map is used instead of Array to boost performance
// Instead of O(n) of Array for get -> will have O(1) of Map for get
const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        }
    } ,
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;
