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
import joinUs from './pages/unlogged/joinUs';
import aboutUs from './pages/unlogged/joinUs';



function App() {
    return (
      <div>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="home" element={<home/>} />
                <Route path="*" element={<NotFound />} /> 
                <Route path="login" element={<Login />} />
                <Route path="joinUs" element={<joinUs />} />
                <Route path="aboutUs" element={<aboutUs />} />
                
            </Routes>
        </Router>
        </div>
    );
}

export default App;