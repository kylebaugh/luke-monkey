import {Link, useLocation} from 'react-router-dom';
import './navbar.css'
function Navbar(){
    const location = useLocation()
    if(location.pathname === '/' || location.pathname === '/register'){}else{
        return(
        <div className='navbar'>
            <Link className="logo-button" to='/dashboard'>
                <img alt='logo' className="logo" src="https://monkidex-bucket.s3.amazonaws.com/b953ba0e-76a8-42ce-80c9-c7d24fb55f51-favicon.ico"/>
                <h1 className='monkidex'>Monkidex</h1>
            </Link>
                <a href="https://forms.gle/4D95yqrSDJ4TezBRA" style={{padding: "2px", backgroundColor: "#FFE600", color: "black"}}>User Feedback</a>
            <div className='buttons'>
                <Link className='button' to='/dashboard'><span>Feed</span></Link>
                {/* <Link className='button' to='/map'><span>Map</span></Link> */}
                <Link className='button' to='/yourdex'><span>Profile</span></Link>
                <Link className='button' to='/'><span>Logout</span></Link>
            </div>
        </div>
        )
    }
    return(
        <div className='navbar'>
            <div className="logo-button">
                <img alt='logo' className="logo" src="https://monkidex-bucket.s3.amazonaws.com/b953ba0e-76a8-42ce-80c9-c7d24fb55f51-favicon.ico"/>
                <h1 className='monkidex'>Monkidex</h1>
            </div>
        </div>
    )
}


export default Navbar