import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import Form from "./form/Form";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

    return (
        <Box
            height="100vh"
            display="flex"
            alignItems="center"
        >
            <Box
                minWidth="50%"
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap="0.5rem"
                textAlign="center"
                alignItems="center"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary" left="20%">
                    Social Network
                </Typography>

                <Typography fontSize="20px" minWidth="5rem" maxWidth="22rem" textAlign="left">
                    Social network helps you connect and share with the people in your life.
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2.5rem"
            >
                <Form />
            </Box>

        </Box>
    );
};

export default LoginPage;