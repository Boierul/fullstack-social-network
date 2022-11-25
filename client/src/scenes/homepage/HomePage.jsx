import React from 'react';
import {useSelector} from "react-redux";

import {Box, useMediaQuery} from "@mui/material";

import Navbar from "../navbar/Navbar";
import UserWidget from "../widgets/user/UserWidget";
import MyPostWidget from "../widgets/posts/MyPostWidget";

function HomePage() {
    const isNonMobileScreens = useMediaQuery("(min-width:1100px)");
    const {_id, picturePath} = useSelector((state) => state.user);

    // Will return all the widgets
    return (
        <Box>
            <Navbar/>

            <Box paddingTop="5rem">

                <Box
                    width="100%"
                    padding="2rem 6%"
                    display={isNonMobileScreens ? "flex" : "block"}
                    gap="0.5rem"
                    justifyContent="space-between"
                >
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                        <UserWidget userId={_id} picturePath={picturePath}/>
                    </Box>

                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath}/>
                </Box>

                </Box>
            </Box>


        </Box>
    );
}

export default HomePage;