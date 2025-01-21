import React from 'react';
import { Link } from 'react-router-dom';
import './Newlistings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Newlistings = () => {
	return (
		<>
			<div className="section">
				<div className='listings d-flex justify-content-between align-items-center px-4'>
					<h3 className="head-3">New Listings</h3>
					<button className="btn">
						<Link className="link" to="/Listings">View All</Link>
					</button>
				</div>
				<div>
					<h2>hello</h2>
				</div>
			</div>
			

		</>
	);
}
export default Newlistings;