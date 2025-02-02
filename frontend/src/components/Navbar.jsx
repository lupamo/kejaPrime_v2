import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import frown from '../assets/images/sorry.png';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () =>  {
	const { isLoggedIn, logout } = useContext(AuthContext);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const navigate = useNavigate();

	// Handling Logout
	const handleLogout = () => {
		navigate('/sign-in');
		setShowProfileMenu(false);
		logout();
	};

	const toggleProfileMenu = () => {
		setShowProfileMenu(!showProfileMenu);
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">KejaPrime</a>
					<button
					 className="navbar-toggler" 
					 type="button" data-bs-toggle="collapse" 
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
								<Link className="nav-link active" aria-current="page" to="/home">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/listings">Listings</Link>
							</li><li className="nav-item">
								<Link className="nav-link" to="/About">About Us</Link>
							</li>
							{/* <li className="nav-item">
								<Link className="nav-link" to="/">Link</Link>
							</li> */}
						</ul>
						<div className='d-flex align-items-center'>
							{isLoggedIn ? (
								<>
									<button 
										className="btn-login rounded px-3 py-1 m-2"
										onClick ={() => navigate('/login')}
									>
										Login
									</button>
									<button 
										className="btn-login rounded px-3 py-1 m-2"
										onClick ={() => navigate('/signup')}
									>
										Sign Up
									</button>
								</>
							): (
								<>
									
									<div className="profile-dropdown position-relative">
										<button 
											className="btn-profile p-0 border-0 bg-transparent"
											onClick={toggleProfileMenu}
										>
											<img 
											src={frown} 
											alt="Profile" 
											className="rounded-full w-16 h-16"
											style={{ width: '50px', height: '50px', borderRadius:"50%"}}
											/>
										</button>
										{showProfileMenu && (
											<div className="profile-menu">
												<div className='profile-menu' style={{width: "250px", height:"250px", textAlign:"center", left:"0", zIndex:"1000"}}>
													<div className="profile-menu-item" style={{cursor: "pointer"}} onClick={() => navigate('/profile')}>
														Profile
													</div>
													<div className="profile-menu-item" style={{cursor: "pointer"}} onClick={() => navigate('/my-listings')}>
														My Listings
													</div>
													<div className="profile-menu-item" style={{cursor: "pointer"}} onClick={() => navigate('/settings')}>
														Settings
													</div>
													<div className="profile-menu-item text-danger" style={{cursor: "pointer"}} onClick={handleLogout}>
														Logout
													</div>
												</div>
											</div>
										)}
									</div>
									<button 
										className="btn-login rounded px-3 py-1 m-2"
										onClick ={() => navigate('/add-listings')}
									>
										Add Listing

									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar;