import React from 'react';
import '../CryptoEgg.css';
import '../styles/navbar.css'


function NavBar() {
  return (
    <nav className="nav-wrapper">
        <div className="logo"> 
            <i className="fas fa-atom"></i> <strong>CryptoBoxes</strong> 
        </div>
        <div className="burger-icon"><i className="fas fa-bars"></i> MENU</div>
        <ul className="nav-items main-nav mobile-hide">
        <li className="list-item"><a href="/">Home</a></li>
        <li className="list-item"><a href="/">Gallery</a></li>
        <li className="list-item"><a href="/">About us</a></li>
        <li className="list-item"><a href="/">Contact</a></li>
        </ul>
    </nav>
  );
}

export default NavBar;

