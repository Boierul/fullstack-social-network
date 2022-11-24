import React from 'react';
import Navbar from "../navbar/Navbar";
import {Box, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import UserWidget from "../widgets/UserWidget";

function HomePage() {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const {_id, picturePath} = useSelector((state) => state.user);

    // Will return all the widgets
    return (
        <Box>
            <Navbar/>

            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
            </Box>



        </Box>
    );
}

export default HomePage;