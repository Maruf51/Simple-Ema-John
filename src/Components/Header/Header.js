import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    // console.log('email', loggedInUser);
    return (
        <div className="header-logo">
            <img src={logo} alt=""/>
            <nav>
                <Link className="headerLink" to="/">Shop</Link>
                <Link className="headerLink" to="/order">Order Review</Link>
                <Link className="headerLink" to="/inventory">Manage Inventory</Link>
                {
                    (loggedInUser.success === true) ? <button className='signLogBtn' onClick={() => setLoggedInUser({})}>Sign Out</button> : <button className='signLogBtn'><Link to="/login">Log in</Link></button>
                }
            </nav>
        </div>
    );
};

export default Header;