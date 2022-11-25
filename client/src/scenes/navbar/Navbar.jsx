import {
    Box,
    FormControl,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {
    AccountBox,
    Close,
    DarkMode,
    Help,
    LightMode,
    Logout,
    Menu,
    Message,
    Notifications,
    Search
} from "@mui/icons-material";

import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLogout, setMode} from "state";

import FlexBetween from "components/FlexBetween";

function Navbar() {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    function handleLogout() {
        dispatch(setLogout())
        navigate("/");
    }

    return (
        <FlexBetween padding="1rem 3%" backgroundColor={alt} zIndex="1" width="100%" position="fixed">

            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Social Network
                </Typography>
            </FlexBetween>

            {/* Show this only on desktop*/}
            {isNonMobileScreens && (
                <FlexBetween
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                    width="25%"
                >
                    <InputBase placeholder="Search"/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            )}

            {/* Desktop Navigation */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">

                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{fontSize: "25px"}}/>
                        ) : (
                            <LightMode sx={{color: dark, fontSize: "25px"}}/>
                        )}
                    </IconButton>

                    <Message sx={{fontSize: "25px"}}/>
                    <Notifications sx={{fontSize: "25px"}}/>
                    <Help sx={{fontSize: "25px"}}/>

                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                minWidth: "3rem",
                                maxWidth: "10rem",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase/>}
                        >
                            <MenuItem value={fullName} style={{width: "150px"}}>
                                {fullName}
                            </MenuItem>
                            <MenuItem>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu/>
                </IconButton>
            )}


            {/* Mobile navigation */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* Close Icon */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close/>
                        </IconButton>
                    </Box>

                    {/* Menu Items */}
                    <FlexBetween
                        display="grid !important"
                        justifyItems="start"
                        gap="0.7rem"
                        margin="1rem"
                        sx={{
                            justifyContent: "center"
                        }}
                    >
                        <IconButton sx={{fontSize: "25px", borderRadius: "0px", "&:hover": {color: "#ff717b"}}}>
                            <AccountBox/>
                            <Typography style={{fontSize: "17px", paddingLeft: "1rem"}}>Your Profile</Typography>
                        </IconButton>

                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{fontSize: "25px", borderRadius: "0px", "&:hover": {color: "#ff717b"}}}
                        >
                            {theme.palette.mode === "dark" ? (
                                <div style={{
                                    display: "flex"
                                }}>
                                    <DarkMode sx={{fontSize: "25px"}}/>
                                    <Typography style={{fontSize: "17px", paddingLeft: "1rem"}}>Toggle
                                        theme</Typography>
                                </div>
                            ) : (
                                <div style={{
                                    display: "flex"
                                }}>
                                    <LightMode sx={{fontSize: "25px"}}/>
                                    <Typography style={{fontSize: "17px", paddingLeft: "1rem"}}>Toggle
                                        theme</Typography>
                                </div>
                            )}
                        </IconButton>

                        <IconButton sx={{
                            borderRadius: "0px",
                            "&:hover": {color: "#ff717b"}
                        }}>
                            <Message sx={{fontSize: "25px"}}/>
                            <Typography style={{fontSize: "17px", paddingLeft: "1rem"}}>Message</Typography>
                        </IconButton>

                        <IconButton sx={{
                            borderRadius: "0px",
                            "&:hover": {color: "#ff717b"}
                        }}>
                            <Notifications sx={{fontSize: "25px"}}/>
                            <Typography style={{fontSize: "17px", paddingLeft: "1rem"}}>Notifications</Typography>
                        </IconButton>

                        <IconButton sx={{
                            borderRadius: "0px",
                            "&:hover": {color: "#ff717b"}
                        }}>
                            <Help sx={{fontSize: "25px"}}/>
                            <Typography style={{fontSize: "17px", paddingLeft: "1rem"}}>Help</Typography>
                        </IconButton>

                        <IconButton sx={{
                            borderRadius: "0px",
                            "&:hover": {color: "#ff717b"}
                        }}>
                            <Logout sx={{fontSize: "25px"}} onClick={handleLogout}/>
                            <Typography style={{fontSize: "17px", paddingLeft: "1rem"}}>Log out</Typography>
                        </IconButton>

                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
}

export default Navbar;