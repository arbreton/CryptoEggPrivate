import React from 'react';
import '../CryptoEgg.css';
import '../styles/navbar.css'


class NavBar extends React.Component {
  componentDidMount(){}

  render() {
    return (
      <nav className="nav-wrapper">
          <div className="logo"> 
              <i className="fas fa-atom"></i> <strong>Klub</strong> 
          </div>
          <div className="burger-icon"><i className="fas fa-bars"></i> MENU</div>
          <ul className="nav-items main-nav mobile-hide">
          <li className="list-item" style={{cursor: 'pointer'}} onClick={this.props.toMembers}>Members</li>
          <li className="list-item" style={{cursor: 'pointer'}} onClick={this.props.toMarket}>Market</li>
          </ul>
      </nav>
    );
  }
  
}

export default NavBar;

