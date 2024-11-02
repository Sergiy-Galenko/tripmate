import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>TripMate</h1>
      <div className="nav-links">
        <Link to="/">Головна</Link>
        <Link to="/map">Карта</Link>
        <Link to="/favorites">Улюблені місця</Link>
        <Link to="/places">Список місць</Link>
      </div>
    </nav>
  );
};

export default Navbar;
