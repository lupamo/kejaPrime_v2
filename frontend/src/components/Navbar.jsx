import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import frown from '../assets/images/sorry.png';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    navigate('/');
    setShowProfileMenu(false);
    logout();
  };

  // Toggle profile menu visibility
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">KejaPrime</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listings">Listings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <div className="profile-dropdown position-relative">
                  <button
                    className="btn-profile p-0 border-0 bg-transparent"
                    onClick={toggleProfileMenu}
                    aria-label="Toggle profile menu"
                  >
                    <img
                      src={frown}
                      alt="Profile"
                      className="rounded-full"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </button>
                  {showProfileMenu && (
                    <div className="profile-menu">
                      <div className="profile-menu-item" onClick={() => navigate('/profile')}>
                        Profile
                      </div>
                      <div className="profile-menu-item" onClick={() => navigate('/my-listings')}>
                        My Listings
                      </div>
                      <div className="profile-menu-item" onClick={() => navigate('/settings')}>
                        Settings
                      </div>
                      <div className="profile-menu-item text-danger" onClick={handleLogout}>
                        Logout
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="btn-login rounded px-3 py-1 m-2"
                  onClick={() => navigate('/add-listings')}
                  aria-label="Add Listing"
                >
                  Add Listing
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-login rounded px-3 py-1 m-2"
                  onClick={() => navigate('/sign-in')}
                  aria-label="Login"
                >
                  Login
                </button>
                <button
                  className="btn-login rounded px-3 py-1 m-2"
                  onClick={() => navigate('/signup')}
                  aria-label="Sign Up"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;