import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import 'antd/dist/reset.css'; 
import NotFound from './pages/unlogged/landing/notFound';
import Landing from './pages/unlogged/landing/landing';
import Login from './pages/unlogged/landing/login';



function App() {
    return (
      <div>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="home" element={<home/>} />
                <Route path="*" element={<NotFound />} /> 
                <Route path="login" element={<Login />} />
                
            </Routes>
        </Router>
        </div>
    );
}

export default App;