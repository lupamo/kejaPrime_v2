import React from 'react'
import Navbar from '../components/Navbar';
import Newlistings from '../components/Newlistings';
import './home.css'
import HeroSection from '../components/HeroSection';
import Value from '../components/Value';

const Home = () => {
	return(
		<>
			<Navbar />
			<HeroSection />
			<Newlistings />
			<Value />
		</>
	);
}

export default Home;