import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import 'antd/dist/reset.css'; 
import { Button } from 'antd';
//import Landing from './pages/unlogged/landing.jsx';


function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404</h1>
            <p>Oops! La pagina no existe.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    );
}

function App() {
    return (
      <div className='button'>
          <Button type='Primary'>Boton prueba</Button>
          
        </div>
        /*<Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<NotFound />} /> 
            </Routes>
        </Router>*/
        
    );
}

export default App;