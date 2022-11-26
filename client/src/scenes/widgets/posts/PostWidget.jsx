import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";

import {setPost} from "state";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const PostWidget = ({
                        postId,
                        postUserId,
                        name,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments
                    }) => {

    // Toggle Comments
    const [isComments, setIsComments] = useState(false);

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    // Show if the post was liked

    // The obj from backend looks like this:
    //  likes: {
    //             "user_id": true,
    //             "another_user_id: true":
    //         }
    const isLiked = Boolean(likes[loggedInUserId]);
    // Grabs the nr of likes
    const likeCount = Object.keys(likes).length;

    const {palette} = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const postsBaseURL = `http://localhost:3001/posts`;
    const assetsURL = `http://localhost:3001/assets`;

    const patchLike = async () => {
        const response = await fetch(`${postsBaseURL}/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: loggedInUserId}),
        });
        const updatedPost = await response.json();
        dispatch(setPost({post: updatedPost}));
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{mt: "1rem"}}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{borderRadius: "0.75rem", marginTop: "0.75rem"}}
                    src={`${assetsURL}/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">

                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{color: primary}}/>
                            ) : (
                                <FavoriteBorderOutlined/>
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined/>
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined/>
                </IconButton>

            </FlexBetween>

            {/* The Box key will concatenate the username with the index of the comment in order to make it unique*/}
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Typography sx={{color: main, m: "0.5rem 0", pl: "1rem"}}>
                                <b style={{
                                    paddingRight: "1rem"
                                }}>{name}</b>{comment}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

        </WidgetWrapper>
    );
};

export default PostWidget;
