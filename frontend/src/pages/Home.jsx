import React from 'react'
import Navbar from '../components/Navbar';
import Newlistings from '../components/Newlistings';
import './home.css'
import HeroSection from '../components/HeroSection';
import Value from '../components/Value';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
	return(
		<>
			<Navbar />
			<HeroSection />
			<Newlistings />
			<Value />
			<Testimonials />
			<Footer />
		</>
	);
}

export default Home;