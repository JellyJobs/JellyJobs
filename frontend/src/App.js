import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import landingContent from './pages/unlogged/landing/landing';

import 'antd/dist/antd.css';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

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
    <Router>
      <Switch>
        <Route exact path="/" component={landingContent} />
        <Route path="/about" component={landingContent} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
