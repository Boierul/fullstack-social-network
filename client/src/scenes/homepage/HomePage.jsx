import React from 'react';
import {useSelector} from "react-redux";

import {Box, useMediaQuery} from "@mui/material";

import Navbar from "../navbar/Navbar";
import UserWidget from "../widgets/user/UserWidget";
import MyPostWidget from "../widgets/posts/MyPostWidget";
import PostsWidget from "../widgets/posts/PostsWidget";
import FriendListWidget from "../widgets/posts/FriendListWidget";
import AdvertWidget from "../widgets/posts/AdvertWidget";

function HomePage() {
    const isNonMobileScreens = useMediaQuery("(min-width:1100px)");
    const {_id, picturePath} = useSelector((state) => state.user);

    // Will return all the widgets
    return (
        <Box>

            <Box>
                <Navbar/>
            </Box>

            <Box paddingTop="5rem">

                <Box
                    width="100%"
                    padding="2rem 6%"
                    display={isNonMobileScreens ? "flex" : "block"}
                    gap="0.5rem"
                    justifyContent="space-evenly"
                >
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                        <UserWidget userId={_id} picturePath={picturePath}/>
                    </Box>

                    <Box
                        flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        <MyPostWidget picturePath={picturePath}/>
                        <PostsWidget userId={_id}/>
                    </Box>

                    {isNonMobileScreens && (
                        <Box flexBasis="26%">
                            <AdvertWidget/>
                            <Box m="2rem 0"/>
                            <FriendListWidget userId={_id}/>
                        </Box>
                    )}

                </Box>
            </Box>


        </Box>
    );
}

export default HomePage;