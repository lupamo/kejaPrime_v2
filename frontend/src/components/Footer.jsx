import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Footer.css';

const Footer = () => {
	const currentYear = new Date().getFullYear();
  return (
	<footer className='footer py-4'>
		<div className='container'>
			<div className='row'>
				<div className='col-md-6'>
					<h5 className='footer-title'>Keja Prime</h5>
					<p className='footer-description'>
					Your go-to platform for finding affordable and reliable housing options.
					</p>
				</div>
				<div className="col-md-3">
					<h5 className="footer-links-title">Quick Links</h5>
            		<ul className="list-unstyled">
						<li><a href="/" className="text-white">Home</a></li>
              			<li><a href="/listings" className="text-white">Listings</a></li>
              			<li><a href="/contact" className="text-white">Contact</a></li>
            		</ul>
				</div>
				<div className='col-md-3'>
					<h5 className='footer-contact-title'> Contact Us</h5>
					<p>Email: support@kejaprime.com</p>
					<p>Phone: +254701187321, +254714380595, +25458973761</p>
				</div>
			</div>
			<div className='text-center mt-3'>
				<p className='text-dark'>&copy; {currentYear} Keja Prime. All rights reserved</p>
			</div>
		</div>
	</footer>
  );
};
export default Footer;