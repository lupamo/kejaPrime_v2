import React from 'react'
import Navbar from '../components/Navbar';
import Newlistings from '../components/Newlistings';
import './home.css'
import HeroSection from '../components/HeroSection';
import Value from '../components/Value';
<<<<<<< HEAD
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
=======
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
>>>>>>> a2f3e45f911d387de4af3c8a15b09a964dad910b

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