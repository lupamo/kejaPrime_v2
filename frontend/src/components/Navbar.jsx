import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () =>  {
	const [isloggedIn, setIsloggedIn] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const navigate = useNavigate();

	// This is a dummy data
	const user = {
		name: "Arnold lupamo",
		profileImage: "https://via.placeholder.com/40"
	};

	// Handling Logout
	const handleLogout = () => {
		setIsloggedIn(false);
		setShowProfileMenu(false);
	};

	const toggleProfileMenu = () => {
		setShowProfileMenu(!showProfileMenu);
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">KejaPrime</a>
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
							<li classNames="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/About">Listing</Link>
							</li><li className="nav-item">
								<Link className="nav-link" to="/About">About Us</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="#">Link</Link>
							</li>
						</ul>
						<div className='d-flex align-items-center'>
							{isloggedIn ? (
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
									<button 
										className="btn-login rounded px-3 py-1 m-2"
										onClick ={() => navigate('/add-listings')}
									>
										Add Listing

									</button>
									<div className="profile-dropdown position-relative">
										<button 
											className="btn-profile p-0 border-0 bg-transparent"
											onClick={toggleProfileMenu}
										>
											<img 
											src={user.profileImage} 
											alt="Profile" 
											className="rounded-circle profile-img"
											/>
										</button>
										{showProfileMenu && (
											<div className="profile-menu position-absolute bg-body-secondary shadow-lg">
												<div className='profile-menu'>
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
											</div>
										)}
									</div>
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