
import { Link } from "react-router-dom";
import '../../../assets/styles/pages/notFound.css';
export default function NotFound() {
    return (
        
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404</h1>
            <p>Oops! La pagina no existe.</p>
            <Link to="/">Go back to Home</Link>
        </div>

    );
}