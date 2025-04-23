import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import defaultProfilePic from '../assets/images/sorry.png';
import { AuthContext } from '../utils/AuthContext';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    navigate('/sign-in');
    setShowProfileMenu(false);
    setIsNavCollapsed(true);
    logout();

    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };
  
  const toggleProfileMenu = (e) => {
    // e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };
  // Profile picture component for reusability
  const ProfilePicture = React.memo(() => (
    <img
      src={user?.profile_pic || defaultProfilePic}
      alt="Profile"
      className="rounded-full"
      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
      onError={(e) => {
        e.target.src = defaultProfilePic;
      }}
    />
  ));  


  const handleNavigation = (e, path) => {
    // e.preventDefault();
    // e.stopPropagation();
    navigate(path);
    setShowProfileMenu(false);
    setIsNavCollapsed(true)
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo Section */}
        <a className="navbar-brand" href="/">KejaPrime</a>

        {/* Mobile Profile and Toggle */}
        <div className="d-flex align-items-center order-lg-last">
          {isLoggedIn && (
            <div className="profile-dropdown d-lg-none position-relative me-2" ref={profileMenuRef}>
              <button
                className="btn-profile p-0 border-0 bg-transparent"
                onClick={toggleProfileMenu}
                aria-label="Toggle profile menu"
              >
                <ProfilePicture />
              </button>
              {showProfileMenu && (
                <div className="profile-menu shadow-sm" style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  zIndex: 1000,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '0.5rem 0',
                  minWidth: '200px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto'
                }}>
                  <div
                    className="profile-menu-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleNavigation('/profile');
            
                    }}
                  >
                    Profile
                  </div>
                  <div
                    className="profile-menu-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleNavigation('/my-listings')
                      setShowProfileMenu(false);
                    }}
                  >
                    My Listings
                  </div>
                  <div
                    className="profile-menu-item px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Main Navigation Content */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" onClick={() => setIsNavCollapsed(true)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listings" onClick={() => setIsNavCollapsed(true)}>Listings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us" onClick={() => setIsNavCollapsed(true)}>About Us</Link>
            </li>
          </ul>

          {/* Right-side buttons */}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <div className="profile-dropdown d-none d-lg-block position-relative me-2" ref={profileMenuRef}>
                  <button
                    className="btn-profile p-0 border-0 bg-transparent"
                    onClick={toggleProfileMenu}
                    aria-label="Toggle profile menu"
                  >
                    <ProfilePicture />
                  </button>
                  {showProfileMenu && (
                    <div className="profile-menu shadow-sm" style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      zIndex: 1000,
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '0.5rem 0',
                      minWidth: '200px',
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}>
                      <button
                        className="profile-menu-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleNavigation('/profile')}
                      >
                        Profile
                      </button>
                      <button
                        className="w-100 text-start px-4 py-2 hover:bg-gray-100 border-0 bg-transparent text-red-600"
                        onClick={(e) => {
                          // e.stopPropagation(); // Stop event propagation
                          handleLogout();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <button
                  className="btn-login rounded px-3 py-1 m-2"
                  onClick={() => navigate('/createListing')}
                  aria-label="Create Listing"
                >
                  Create a Listing
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-login rounded px-3 py-1 m-2"
                  onClick={(e) => handleNavigation(e, '/sign-in')}
                  aria-label="Login"
                >
                  Login
                </button>
                <button
                  className="btn-login rounded px-3 py-1 m-2"
                  onClick={(e) => handleNavigation(e, '/sign-up')}
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