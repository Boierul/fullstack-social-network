import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./scenes/homepage/HomePage";
import LoginPage from "./scenes/loginpage/LoginPage";
import ProfilePage from "./scenes/profilepage/ProfilePage";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";

function App() {
    // Grabbing the mode from the state
    const mode = useSelector((state) => state.mode);
    // Generates the theme
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    // Grabbing the JWT and
    const isAuth = Boolean(useSelector((state) => state.token));

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/"/>}/>
                        <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/"/>}/>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
