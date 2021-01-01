import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import logo from '../images/service-icon.png'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true);
        }
        };

        useEffect(() => {
            showButton()
        },[])

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar-main">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    <img class="navbar-logo__image" src={logo} />
                    <p className="navbar-logo__text">Social Listening</p>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu} >
                            Home
                        </Link>
                        </li>
                        <li className='nav-item'>
                        <Link to='/twitter' className='nav-links' onClick={closeMobileMenu} >
                            TwitterServices
                        </Link>
                        </li>
                        <li className='nav-item'>
                        <Link to='/profile' className='nav-links' onClick={closeMobileMenu} >
                            Profile
                        </Link>
                        </li>
                        <li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick={closeMobileMenu} >
                            Login
                        </Link>
                        </li>
                        <li className='nav-item'>
                        <Link to='/signup' className='nav-links' onClick={closeMobileMenu} >
                            Signup
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>  
        </>
    )
}

export default Navbar
