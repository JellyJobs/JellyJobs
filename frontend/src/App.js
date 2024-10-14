import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import 'antd/dist/reset.css'; 
import NotFound from './pages/unlogged/notFound';
import Landing from './pages/unlogged/landing';
import Login from './pages/unlogged/login';
import JoinUs from './pages/unlogged/joinUs';
import AboutUs from './pages/unlogged/aboutUs';
import Home from './pages/home';



function App() {
    return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="home" element={<Home />} />
                <Route path="*" element={<NotFound />} /> 
                <Route path="login" element={<Login />} />
                <Route path="joinUs" element={<JoinUs />} />
                <Route path="aboutUs" element={<AboutUs />} />
                
            </Routes>
        </Router>
        </div>
    );
}

export default App;