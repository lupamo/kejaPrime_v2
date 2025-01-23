import React from 'react'
import Navbar from '../components/Navbar';
import Newlistings from '../components/Newlistings';
import './home.css'

const Home = () => {
	return(
		<>
			<Navbar />
			<Newlistings />
		</>
	);
}

export default Home;