import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import 'antd/dist/reset.css'; 
import NotFound from './pages/unlogged/notFound.jsx';
import Landing from './pages/unlogged/landing.jsx';
import Login from './pages/unlogged/login.jsx';
import JoinUs from './pages/unlogged/joinUs.jsx';
import AboutUs from './pages/unlogged/aboutUs.jsx';
import Home from './pages/logged/home.jsx';
import ProfilePage from './pages/logged/user-settings.jsx';
import ForgotPassword from './pages/unlogged/forgot-password.jsx';
import Scores from './pages/logged/scores.jsx';
import Solicitudes from './pages/logged/requests.jsx';
import PrivateRoute from './funcionalitys/privateRout.jsx';
import Create from './pages/logged/create.jsx';


function App() {

    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                    </Route>
                    <Route path="/perfil-user" element={<ProfilePage userEmail="admin@example.com" />} />
                    <Route path="*" element={<NotFound />} /> 
                    <Route path="login" element={<Login />} />
                    <Route path="joinUs" element={<JoinUs />} />
                    <Route path="aboutUs" element={<AboutUs />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="scores" element={<Scores/>} />
                    <Route path="/requests" element={<Solicitudes />} />
                    <Route path="/create" element={< Create/>} />
                </Routes>
        </Router>
    );
}

export default App;
