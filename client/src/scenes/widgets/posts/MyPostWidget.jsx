import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
    FileUpload
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "state";
import Dropzone from "react-dropzone";

const MyPostWidget = ({picturePath}) => {
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    const {palette} = useTheme();
    const medium = palette.neutral.medium;
    const mediumMain = palette.neutral.mediumMain;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const dispatch = useDispatch();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const postsURL = `http://localhost:3001/posts`;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);

        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(postsURL, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        });

        const posts = await response.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setPost("");
    };

    return (
        <WidgetWrapper>

            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath}/>
                <InputBase
                    placeholder="What have you been up to?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>

            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({getRootProps, getInputProps}) => (
                            <FlexBetween>

                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{"&:hover": {cursor: "pointer"}}}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <p>Add Image Here</p>
                                            <FileUpload sx={{
                                                marginLeft: "1rem"
                                            }}/>
                                        </Box>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined/>
                                        </FlexBetween>
                                    )}
                                </Box>

                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{marginLeft: ".7rem", color: palette.primary.main}}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}

                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{margin: "1.25rem 0"}}/>

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{color: mediumMain}}/>
                    <Typography
                        color={mediumMain}
                        sx={{"&:hover": {cursor: "pointer", color: medium}}}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{color: mediumMain}}/>
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                        "&:hover": {
                            backgroundColor: palette.primary.darker
                        }
                    }}
                >
                    POST
                < /Button>

            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
