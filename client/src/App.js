import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./scenes/homepage/HomePage";
import LoginPage from "./scenes/loginpage/LoginPage";
import ProfilePage from "./scenes/profilepage/ProfilePage";

function App() {

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/profile/:userId" element={<ProfilePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
