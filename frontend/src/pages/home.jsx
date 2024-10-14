import '../assets/styles/pages/home.css';
import logo from  '../assets/images/logo.png';

export default function home (){
    return (
        <div>
            <nav className='links-functions'>
                <a href="/" className='links,logo-JellyJobs'><img src={logo} alt="logo" /></a>
            </nav>

        </div>
    )


}